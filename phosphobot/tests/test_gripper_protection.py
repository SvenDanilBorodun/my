#!/usr/bin/env python3
"""
Test script for gripper protection functionality.
This script validates that the gripper stops closing when resistance is detected.
"""

import time
import numpy as np
from unittest.mock import Mock, patch
from phosphobot.hardware.so100 import SO100Hardware
from phosphobot.models.robot import BaseRobotConfig


def test_gripper_resistance_detection():
    """Test that gripper resistance detection works properly."""
    print("Testing gripper resistance detection...")
    
    # Create mock robot
    robot = SO100Hardware(device_name="test", serial_id="test")
    robot.is_connected = True
    robot.motors_bus = Mock()  # Mock the motors_bus to prevent cleanup errors
    
    # Create mock config
    mock_config = Mock(spec=BaseRobotConfig)
    mock_config.servos_calibration_position = [0, 0, 0, 0, 0, 3000]  # Open position for gripper
    mock_config.servos_offsets = [0, 0, 0, 0, 0, 1000]              # Close position for gripper
    mock_config.gripping_threshold = 80
    robot.config = mock_config
    
    # Mock motor communication methods
    robot.read_motor_torque = Mock(return_value=90)  # High torque indicating resistance
    robot.read_motor_position = Mock(return_value=2000)  # Current position
    robot.write_motor_position = Mock()
    
    # Test resistance detection
    assert robot.check_gripper_resistance() == True, "Should detect high resistance"
    
    # Test with low torque
    robot.read_motor_torque.return_value = 30  # Low torque
    assert robot.check_gripper_resistance() == False, "Should not detect low resistance"
    
    print("PASS: Gripper resistance detection test passed")


def test_gripper_protection_in_write_command():
    """Test that write_gripper_command stops on resistance."""
    print("Testing gripper protection in write_gripper_command...")
    
    # Create mock robot
    robot = SO100Hardware(device_name="test", serial_id="test")
    robot.is_connected = True
    robot.motors_bus = Mock()  # Mock the motors_bus to prevent cleanup errors
    
    # Create mock config
    mock_config = Mock(spec=BaseRobotConfig)
    mock_config.servos_calibration_position = [0, 0, 0, 0, 0, 3000]  # Open position
    mock_config.servos_offsets = [0, 0, 0, 0, 0, 1000]              # Close position
    mock_config.gripping_threshold = 80
    robot.config = mock_config
    
    # Mock methods
    robot.read_motor_position = Mock(return_value=2000)  # Current position (halfway)
    robot.write_motor_position = Mock()
    robot.check_gripper_resistance = Mock(return_value=True)  # High resistance
    
    # Try to close gripper (command < current position percentage)
    robot.write_gripper_command(0.3)  # Close more (current is ~0.5)
    
    # Should not write position due to resistance
    robot.write_motor_position.assert_not_called()
    
    print("PASS: Gripper write command protection test passed")


def test_gripper_protection_in_control_gripper():
    """Test that control_gripper stops on resistance."""
    print("Testing gripper protection in control_gripper...")
    
    # Create mock robot  
    robot = SO100Hardware(device_name="test", serial_id="test")
    robot.is_connected = True
    
    # Create mock config
    mock_config = Mock(spec=BaseRobotConfig)
    mock_config.servos_calibration_position = [0, 0, 0, 0, 0, 3000]  # Open position
    mock_config.servos_offsets = [0, 0, 0, 0, 0, 1000]              # Close position
    mock_config.gripping_threshold = 80
    robot.config = mock_config
    
    # Mock methods
    robot.read_motor_position = Mock(return_value=2000)  # Current position (halfway)
    robot.write_gripper_command = Mock()
    robot.check_gripper_resistance = Mock(return_value=True)  # High resistance
    robot.update_object_gripping_status = Mock()
    
    # Try to close gripper (command < current position percentage)
    robot.control_gripper(0.3)  # Close more (current is ~0.5)
    
    # Should call write_gripper_command with current position, not target position
    robot.write_gripper_command.assert_called_once()
    # Get the actual argument passed
    called_args = robot.write_gripper_command.call_args[0]
    assert called_args[0] >= 0.4, "Should maintain current position, not close further"
    
    print("PASS: Gripper control_gripper protection test passed")


def test_gripper_protection_in_group_write():
    """Test that write_group_motor_position excludes gripper on resistance."""
    print("Testing gripper protection in write_group_motor_position...")
    
    # Create mock robot
    robot = SO100Hardware(device_name="test", serial_id="test")
    robot.is_connected = True
    robot.motors_bus = Mock()  # Mock the motors_bus to prevent cleanup errors
    robot.motors = {"servo1": (1, "sts3215"), "servo2": (2, "sts3215"), 
                   "servo3": (3, "sts3215"), "servo4": (4, "sts3215"),
                   "servo5": (5, "sts3215"), "gripper": (6, "sts3215")}
    
    # Create mock config
    mock_config = Mock(spec=BaseRobotConfig)
    mock_config.servos_calibration_position = [0, 0, 0, 0, 0, 3000]  # Open position
    mock_config.servos_offsets = [0, 0, 0, 0, 0, 1000]              # Close position
    mock_config.gripping_threshold = 80
    robot.config = mock_config
    
    # Mock methods
    robot.read_motor_position = Mock(return_value=2000)  # Current position
    robot.check_gripper_resistance = Mock(return_value=True)  # High resistance
    robot.motors_bus = Mock()
    robot.update_motor_errors = Mock()
    
    # Try to write all motors including gripper closing
    q_target = np.array([100, 200, 300, 400, 500, 1500])  # Last value closes gripper
    robot.write_group_motor_position(q_target, enable_gripper=True)
    
    # Should call write without gripper values
    robot.motors_bus.write.assert_called_once()
    call_args = robot.motors_bus.write.call_args
    # Get the keyword arguments passed to write
    kwargs = call_args[1] if len(call_args) > 1 else call_args.kwargs
    values = kwargs['values']
    motor_names = kwargs['motor_names']
    
    assert len(values) < 6, f"Should exclude gripper from movement, got {len(values)} values: {values}"
    assert 'gripper' not in motor_names, f"Should exclude gripper motor name, got: {motor_names}"
    
    print("PASS: Gripper group write protection test passed")


def test_opening_motion_not_blocked():
    """Test that opening motions are not blocked by resistance."""
    print("Testing that opening motions are not blocked...")
    
    # Create mock robot
    robot = SO100Hardware(device_name="test", serial_id="test")
    robot.is_connected = True
    robot.motors_bus = Mock()  # Mock the motors_bus to prevent cleanup errors
    
    # Create mock config
    mock_config = Mock(spec=BaseRobotConfig)
    mock_config.servos_calibration_position = [0, 0, 0, 0, 0, 3000]  # Open position
    mock_config.servos_offsets = [0, 0, 0, 0, 0, 1000]              # Close position
    mock_config.gripping_threshold = 80
    robot.config = mock_config
    
    # Mock methods
    robot.read_motor_position = Mock(return_value=1500)  # Current position (quarter closed)
    robot.write_motor_position = Mock()
    robot.check_gripper_resistance = Mock(return_value=True)  # High resistance
    
    # Try to open gripper (command > current position percentage)
    robot.write_gripper_command(0.7)  # Open more (current is ~0.25)
    
    # Should write position despite resistance (opening motion)
    robot.write_motor_position.assert_called_once()
    
    print("PASS: Opening motion not blocked test passed")


def run_all_tests():
    """Run all gripper protection tests."""
    print("=" * 50)
    print("GRIPPER PROTECTION TESTS")
    print("=" * 50)
    
    try:
        test_gripper_resistance_detection()
        test_gripper_protection_in_write_command()
        test_gripper_protection_in_control_gripper()
        test_gripper_protection_in_group_write()
        test_opening_motion_not_blocked()
        
        print("\n" + "=" * 50)
        print("ALL TESTS PASSED!")
        print("Gripper protection is working correctly.")
        print("=" * 50)
        
    except Exception as e:
        print(f"\nTEST FAILED: {e}")
        raise


if __name__ == "__main__":
    run_all_tests()
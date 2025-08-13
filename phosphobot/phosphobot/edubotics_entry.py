#!/usr/bin/env python3
"""
EduBotics Entry Point
Maps edubotics commands to the phosphobot CLI system
"""

if __name__ == "__main__":
    # Import the phosphobot CLI
    from phosphobot.main import cli
    
    # Run the CLI - this handles all arguments including 'run', 'train', etc.
    cli()
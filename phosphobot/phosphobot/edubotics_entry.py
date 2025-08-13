#!/usr/bin/env python3
"""
EduBotics Entry Point for PyInstaller
Entry point for the edubotics CLI system
"""

if __name__ == "__main__":
    # Import the edubotics CLI
    from phosphobot.main import cli
    
    # Run the CLI - this handles all arguments including 'run', 'train', etc.
    cli()
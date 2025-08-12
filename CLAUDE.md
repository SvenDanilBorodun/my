# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Phosphobot** is an AI-ready robotics development kit for controlling robots, recording datasets, and training Vision Language Action (VLA) models. The project supports multiple robotic platforms including SO-100/101, Unitree Go2, Koch arms, WX-250s, and others.

## Architecture

### Core Components

- **phosphobot/**: Main Python package containing the robotics control system
  - `main.py`: CLI entry point using Typer
  - `app.py`: FastAPI web server for robot control API
  - `robot.py`: Core robot abstraction and control logic
  - `hardware/`: Hardware-specific drivers and abstractions
  - `models/`: Data models for cameras, robots, and datasets
  - `endpoints/`: FastAPI route handlers
- **dashboard/**: React/Vite frontend for robot control interface
- **cloud/frontend/**: Next.js cloud platform frontend
- **examples/**: Various robotics control examples and tutorials
- **modal/**: Model inference servers (ACT, gr00t, etc.)
- **inference/**: Local inference clients for different AI models

### Key Technologies

- **Backend**: Python 3.10+, FastAPI, Uvicorn, WebSockets
- **Frontend**: React 19, TypeScript, Vite, TailwindCSS
- **Hardware**: Dynamixel SDK, PyRealSense2, PyBullet simulation
- **AI/ML**: HuggingFace, Datasets, NumPy, OpenCV
- **Build**: PyInstaller for executables, uv for dependency management

## Common Development Commands

### Development Setup
```bash
# Install from source
git clone https://github.com/phospho-app/phosphobot.git
cd phosphobot
make  # Builds frontend and starts server
```

### Running the Server
```bash
# Production mode (headless simulation)
make prod

# Production with GUI simulation
make prod_gui

# Development mode (localhost only)
make local

# With telemetry disabled
make prod_no_telemetry
```

### Build Commands
```bash
# Build frontend only
make build_frontend

# Build executable with PyInstaller
make build_pyinstaller

# Clean build artifacts
make clean_build
```

### Testing
```bash
# Run API integration tests
make test_server  # Start test server
cd phosphobot && uv run pytest -s

# Test built executable
make run_bin_test
```

### Python Package Management
```bash
# Install with development dependencies
cd phosphobot && uv run --python 3.10 pip install -e ".[dev]"

# Run with uv
cd phosphobot && uv run phosphobot run --simulation=headless
```

### Frontend Development
```bash
# Dashboard (React/Vite)
cd dashboard && npm i && npm run dev

# Cloud frontend (Next.js)
cd cloud/frontend && npm install && npm run dev
```

## Key Configuration Files

- `phosphobot/pyproject.toml`: Python dependencies and project metadata
- `phosphobot/resources/`: Robot configurations, URDF models, web assets
- `dashboard/package.json`: React dashboard dependencies
- `Makefile`: Build and development commands
- `phosphobot_release.spec`: PyInstaller build configuration

## Robot Hardware Support

The system uses a plugin architecture in `phosphobot/hardware/`:
- `base.py`: Abstract base classes for manipulators and mobile robots  
- `so100.py`: SO-100/101 arm support
- `go2.py`: Unitree Go2 quadruped support
- `koch11.py`: Koch arm support
- `wx250s.py`: Trossen WX-250s arm support
- `motors/`: Motor control utilities (Dynamixel, Feetech)

## Data Flow

1. **Control Interface**: Web dashboard or API calls
2. **Robot Control**: Commands sent via WebSocket to robot drivers
3. **Data Recording**: Joint positions, camera feeds saved as datasets
4. **Model Training**: Datasets uploaded to HuggingFace for VLA training
5. **AI Inference**: Trained models deployed via Modal or local inference

## Development Notes

- Uses `uv` for fast Python dependency management
- Frontend assets are built into `phosphobot/resources/dist/`
- Robot configurations stored in `resources/default/` and `resources/calibration/`
- API documentation available at `localhost:80/docs` when server running
- WebSocket endpoints handle real-time robot control
- Integration with HuggingFace Hub for dataset and model management

## Port Configuration

- Default production: port 80 (fallback to 8020 if busy)
- Development: port 8080
- API docs: `/docs` endpoint on main port
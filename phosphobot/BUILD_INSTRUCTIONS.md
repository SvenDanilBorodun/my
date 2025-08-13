# EduBotics Executable Build Instructions

This guide explains how to build standalone executables for the EduBotics project.

## Quick Start

### Windows
```cmd
cd phosphobot
python -m pip install -e ".[dev]"
python -m PyInstaller --clean edubotics_release.spec
```

### Linux/macOS
```bash
cd phosphobot
python3 -m pip install -e ".[dev]"
python3 -m PyInstaller --clean edubotics_release.spec
```

## Build Scripts

Automated build scripts are available in the `build/` directory:

### Windows (PowerShell)
```powershell
.\build\build.ps1 --clean --test
```

### Linux/macOS (Bash)
```bash
./build/build.sh --clean
```

### Python (Cross-platform)
```bash
python build/build_executable.py
```

## Build Process

### 1. Preparation
- Install PyInstaller and development dependencies
- Ensure phosphobot package is installed in development mode
- Verify all resources are present

### 2. PyInstaller Spec File
The `edubotics_release.spec` file contains:
- All required Python modules and dependencies
- Resource files (configurations, URDF models, web assets)
- Build optimizations and excludes

### 3. Key Dependencies
- **Core**: FastAPI, Uvicorn, Rich, Loguru, Typer
- **Hardware**: Dynamixel SDK, Feetech SDK, PySerial, PyRealSense2
- **Vision**: OpenCV, NumPy, Matplotlib
- **AI/ML**: PyBullet, Datasets, HuggingFace Hub
- **Networking**: WebSockets, Requests, ZMQ

### 4. Data Files Included
- Robot configurations (`resources/default/`, `resources/calibration/`)
- URDF models and meshes (`resources/urdf/`)
- Web UI assets (`resources/swagger-ui/`)
- Hardware activation scripts

## Testing

Test the executable before distribution:
```bash
# Windows
dist\phosphobot\phosphobot.exe --version
dist\phosphobot\phosphobot.exe info

# Linux/macOS  
./dist/phosphobot/phosphobot --version
./dist/phosphobot/phosphobot info
```

## GitHub Actions CI/CD

Automated builds are configured for:
- **Windows** (windows-latest)
- **Linux** (ubuntu-latest)
- **macOS** (macos-latest)

### Workflow Triggers
- Push to tags (`v*`)
- Pull requests to main/master
- Manual workflow dispatch

### Artifacts
- `phosphobot-v{version}-windows-x64.zip`
- `phosphobot-v{version}-linux-x64.tar.gz`
- `phosphobot-v{version}-macos-x64.tar.gz`

## Release Process

1. **Version Bump**: Update version in `pyproject.toml`
2. **Tag Release**: `git tag v{version} && git push origin v{version}`
3. **Automatic Build**: GitHub Actions creates executables
4. **Release Creation**: Automated release with all platform binaries

## Troubleshooting

### Common Issues

**Missing Dependencies**
```bash
# Install missing packages
pip install pyinstaller>=6.11.1
```

**Resource Files Not Found**
```bash
# Verify resources directory
ls phosphobot/resources/
```

**Import Errors**
```bash
# Check hidden imports in spec file
# Add missing modules to hiddenimports list
```

**Large File Size**
- Review excludes list in spec file
- Consider removing unused dependencies
- Use UPX compression (already enabled)

### Build Optimization

**Reduce Binary Size**:
1. Exclude unnecessary modules in spec file
2. Remove test packages and development tools
3. Use `--onefile` for single executable (trade-off: slower startup)

**Improve Startup Time**:
1. Use `--onedir` (default in spec)
2. Minimize hidden imports
3. Exclude heavy packages not needed at runtime

## Platform-Specific Notes

### Windows
- Requires Windows 10/11 x64
- Administrator rights may be needed for hardware access
- Windows Defender may quarantine the executable initially

### Linux
- Build on oldest supported Ubuntu LTS for compatibility
- Include system libraries (libudev, etc.)
- Test on different distributions

### macOS
- Universal binaries not supported yet (Intel only)
- Notarization required for distribution
- Hardware access requires appropriate permissions

## Development

### Modifying the Build
1. Edit `edubotics_release.spec` for PyInstaller configuration
2. Update `build/build_executable.py` for build automation
3. Modify `.github/workflows/release.yml` for CI/CD changes

### Adding Dependencies
1. Add to `pyproject.toml` dependencies
2. Add to `hiddenimports` in spec file if needed
3. Test build and runtime functionality

## Support

For build issues:
1. Check [GitHub Issues](https://github.com/phospho-app/phosphobot/issues)
2. Review PyInstaller documentation
3. Test with minimal spec file first

## License

This build system is part of the Phosphobot project and follows the same MIT license.
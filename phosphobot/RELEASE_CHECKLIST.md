# Phosphobot Release Checklist

Use this checklist when creating a new release with executable binaries.

## Pre-Release Preparation

### 📋 Code Quality
- [ ] All tests pass locally
- [ ] Code has been reviewed and approved
- [ ] No hardcoded secrets or development URLs
- [ ] Documentation is up to date

### 🔢 Version Management
- [ ] Update version in `phosphobot/pyproject.toml`
- [ ] Update version in `phosphobot/phosphobot/_version.py` (if applicable)
- [ ] Update CHANGELOG.md with new features/fixes
- [ ] Commit version changes

### 🧪 Local Testing
- [ ] Test installation: `pip install -e ".[dev]"`
- [ ] Test basic functionality: `phosphobot --version`
- [ ] Test server startup: `phosphobot run`
- [ ] Test hardware detection: `phosphobot info`

## Build Testing

### 🔨 Build Executables Locally
- [ ] **Windows**: Run `build\build.ps1 --clean --test`
- [ ] **Linux**: Run `build/build.sh --clean` 
- [ ] **macOS**: Run `build/build.sh --clean`

### ✅ Executable Testing
For each platform:
- [ ] Executable runs without errors
- [ ] `--version` shows correct version
- [ ] `--help` displays properly
- [ ] `info` command works
- [ ] Server starts with `run` command
- [ ] Web interface accessible at localhost

### 📦 Package Testing
- [ ] Verify all resource files are included
- [ ] Check file sizes are reasonable (< 500MB per platform)
- [ ] Test extraction and execution from archive
- [ ] Verify README files are included

## Release Process

### 🏷️ Create Git Tag
```bash
git tag -a v{version} -m "Release v{version}"
git push origin v{version}
```

### 🤖 GitHub Actions
- [ ] Monitor GitHub Actions workflow execution
- [ ] Verify all three platforms build successfully
- [ ] Check no build warnings or errors
- [ ] Confirm artifacts are uploaded

### 📝 Create GitHub Release
- [ ] Release is automatically created by workflow
- [ ] Release notes are properly formatted
- [ ] All three platform binaries are attached
- [ ] Download links work correctly

## Post-Release Verification

### 🔍 Download Testing
Test each release artifact:
- [ ] **Windows**: Download and test `phosphobot-v{version}-windows-x64.zip`
- [ ] **Linux**: Download and test `phosphobot-v{version}-linux-x64.tar.gz`
- [ ] **macOS**: Download and test `phosphobot-v{version}-macos-x64.tar.gz`

### 🌐 Distribution Testing
- [ ] Test downloads from different networks
- [ ] Verify antivirus doesn't flag executables
- [ ] Check file integrity (checksums if provided)

### 📚 Documentation Updates
- [ ] Update installation docs with new version
- [ ] Update download links in README
- [ ] Announce release in appropriate channels

## Rollback Plan

If issues are discovered:
- [ ] **Minor Issues**: Create patch release
- [ ] **Major Issues**: Hide/delete release and create hotfix
- [ ] **Critical Issues**: Revert tag and notify users

## Quality Gates

### ⛔ Do Not Release If:
- [ ] Any executable fails to start
- [ ] Major functionality is broken
- [ ] Security vulnerabilities are present
- [ ] Build process shows errors
- [ ] Licensing issues exist

### ⚠️ Consider Delaying If:
- [ ] Build warnings are present
- [ ] File sizes are unusually large
- [ ] Platform compatibility issues
- [ ] Documentation is incomplete

## Release Communication

### 📢 Announcement Checklist
- [ ] Update project README
- [ ] Post to GitHub Discussions
- [ ] Update package managers (if applicable)
- [ ] Notify integration partners

### 📊 Analytics & Monitoring
- [ ] Monitor download statistics
- [ ] Track error reports
- [ ] Monitor user feedback
- [ ] Update usage documentation based on feedback

## Version-Specific Notes

### v0.3.87 Release Notes
- First automated executable build
- Multi-platform support (Windows, Linux, macOS)
- Standalone binaries with all dependencies
- Web dashboard included
- Hardware drivers bundled

---

## Template Commit Messages

**Version Bump:**
```
bump: version 0.3.87

- Update pyproject.toml version
- Update changelog
- Prepare for release
```

**Release Tag:**
```
v0.3.87

🚀 Phosphobot v0.3.87 Release

Features:
- Standalone executables for Windows, Linux, macOS
- Embedded web dashboard
- Hardware driver support
- Robot simulation capabilities

Installation:
Download the appropriate binary for your platform and run:
- Windows: phosphobot.exe run
- Linux/macOS: ./phosphobot run

Documentation: https://docs.phospho.ai
```

---

## Checklist Summary

**Pre-Release:** ☐ Code ☐ Version ☐ Test  
**Build:** ☐ Local ☐ CI ☐ Test  
**Release:** ☐ Tag ☐ Actions ☐ GitHub  
**Post:** ☐ Download ☐ Docs ☐ Announce  

**Release Ready:** All items checked ✅
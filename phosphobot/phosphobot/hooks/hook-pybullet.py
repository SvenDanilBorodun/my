"""
PyInstaller hook for pybullet package.
This ensures that pybullet DLLs and data files are properly included.
"""

from PyInstaller.utils.hooks import collect_data_files, collect_dynamic_libs, get_package_paths
import os
from pathlib import Path

# Collect all pybullet data files and DLLs
datas = collect_data_files('pybullet')
binaries = collect_dynamic_libs('pybullet')

# Ensure pybullet DLLs and data are included
try:
    import pybullet
    pybullet_dir = Path(pybullet.__file__).parent
    
    # Include all DLLs and shared libraries
    for dll_file in pybullet_dir.glob("*.dll"):
        binaries.append((str(dll_file), '.'))
    for so_file in pybullet_dir.glob("*.so*"):
        binaries.append((str(so_file), '.'))
    for pyd_file in pybullet_dir.glob("*.pyd"):
        binaries.append((str(pyd_file), '.'))
        
    # Include pybullet_data if available
    try:
        import pybullet_data
        pybullet_data_dir = Path(pybullet_data.__file__).parent
        datas.append((str(pybullet_data_dir), 'pybullet_data'))
    except ImportError:
        pass
        
except ImportError:
    pass

# Hidden imports for pybullet
hiddenimports = [
    'pybullet',
    'pybullet_data',
    'numpy',
]
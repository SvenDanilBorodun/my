"""
PyInstaller hook for wasmtime package.
This ensures that wasmtime DLLs are properly included and loaded.
"""

from PyInstaller.utils.hooks import collect_data_files, collect_dynamic_libs
import os
from pathlib import Path

# Collect all wasmtime data files and DLLs
datas = collect_data_files('wasmtime')
binaries = collect_dynamic_libs('wasmtime')

# Ensure wasmtime DLLs are included
try:
    import wasmtime
    wasmtime_dir = Path(wasmtime.__file__).parent
    
    # Include platform-specific DLLs
    platform_dirs = ['win32-x86_64', 'linux-x86_64', 'darwin-x86_64', 'darwin-aarch64']
    
    for platform_dir in platform_dirs:
        dll_dir = wasmtime_dir / platform_dir
        if dll_dir.exists():
            for dll_file in dll_dir.glob("*.dll"):
                binaries.append((str(dll_file), f'wasmtime/{platform_dir}'))
            for so_file in dll_dir.glob("*.so*"):
                binaries.append((str(so_file), f'wasmtime/{platform_dir}'))
            for dylib_file in dll_dir.glob("*.dylib"):
                binaries.append((str(dylib_file), f'wasmtime/{platform_dir}'))
                
except ImportError:
    pass

# Hidden imports for wasmtime
hiddenimports = [
    'wasmtime',
    'wasmtime._ffi',
    'wasmtime._bindings',
    'ctypes',
    'ctypes.util',
]
import importlib.metadata

try:
    __version__ = importlib.metadata.version("edubotics")
except importlib.metadata.PackageNotFoundError:
    print("PackageNotFoundError: No package metadata was found for 'edubotics'.")
    __version__ = "unknown"

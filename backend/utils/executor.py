import subprocess
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

def execute_syscall(binary_name):
    binary_path = os.path.join(BASE_DIR, "syscall_bins", binary_name)

    if not os.path.exists(binary_path):
        raise FileNotFoundError(f"Binary '{binary_name}' not found")

    try:
        result = subprocess.run(
            ["strace", "-e", "trace=file,process,read,write", binary_path],
            capture_output=True,
            text=True,
            timeout=10
        )
        return result.stderr
    except FileNotFoundError:
        raise RuntimeError("strace is not installed")
    except subprocess.TimeoutExpired:
        raise RuntimeError(f"Execution of '{binary_name}' timed out")
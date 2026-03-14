import subprocess
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
STRACE_BIN = os.path.join(BASE_DIR, "strace")

def execute_syscall(binary_name):
    binary_path = os.path.join(BASE_DIR, "syscall_bins", binary_name)

    # make sure strace binary is executable
    os.chmod(STRACE_BIN, 0o755)

    result = subprocess.run(
        [STRACE_BIN, "-e", "trace=file,process,read,write", binary_path],
        capture_output=True,
        text=True,
        timeout=10
    )
    return result.stderr
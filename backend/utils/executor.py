import subprocess
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

def execute_syscall(binary_name):

    binary_path = os.path.join(BASE_DIR, "syscall_bins", binary_name)

    command = [
        "strace",
        "-e", "trace=file,process,read,write",
        binary_path
    ]

    result = subprocess.run(
        command,
        capture_output=True,
        text=True
    )

    return result.stderr
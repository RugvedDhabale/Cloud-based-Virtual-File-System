from utils.executor import execute_syscall
from parser.strace_parser import parse_strace_output


def run_syscall(binary_name):

    trace_output = execute_syscall(binary_name)

    steps = parse_strace_output(trace_output)

    return {
        "binary": binary_name,
        "steps": steps
    }
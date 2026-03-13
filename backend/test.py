from utils.executor import execute_syscall
from parser.strace_parser import parse_strace_output

trace = execute_syscall("open")

steps = parse_strace_output(trace)

print(steps)
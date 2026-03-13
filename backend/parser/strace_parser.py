IMPORTANT_SYSCALLS = {
    "open",
    "openat",
    "read",
    "write",
    "close",
    "fork",
    "vfork",
    "clone",
    "execve",
    "exit",
    "exit_group"
}


def parse_strace_output(trace):

    steps = []
    seen = set()

    lines = trace.split("\n")

    for line in lines:

        if "(" not in line:
            continue

        syscall = line.split("(")[0].strip()

        # keep only important syscalls
        if syscall not in IMPORTANT_SYSCALLS:
            continue

        # avoid duplicates but preserve order
        if syscall not in seen:
            steps.append(syscall)
            seen.add(syscall)

    return steps
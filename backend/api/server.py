import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers.syscall_controller import run_syscall
from graph.flow_builder import build_flow

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/syscall/{name}")
def execute_syscall(name: str):

    result = run_syscall(name)

    graph = build_flow(result["steps"])

    return {
        "program": name,
        "syscalls": result["steps"],
        "flow_graph": graph
    }


@app.get("/syscalls")
def get_available_syscalls():

    base_dir = os.path.dirname(os.path.dirname(__file__))
    bin_dir = os.path.join(base_dir, "syscall_bins")

    if not os.path.exists(bin_dir):
        return {"syscalls": []}

    files = [
        f for f in os.listdir(bin_dir)
        if os.path.isfile(os.path.join(bin_dir, f))
    ]

    return {"syscalls": files}
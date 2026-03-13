def build_flow(syscalls):

    nodes = []
    edges = []

    for i, call in enumerate(syscalls):

        node_id = f"n{i}"

        nodes.append({
            "id": node_id,
            "label": call
        })

        if i > 0:
            edges.append({
                "source": f"n{i-1}",
                "target": node_id
            })

    return {
        "nodes": nodes,
        "edges": edges
    }
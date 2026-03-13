import { useEffect, useState } from "react"
import { getSyscall, getSyscalls } from "../api/backend"
import SyscallGraph from "../components/SyscallGraph"

function Dashboard() {
  const [graph, setGraph] = useState(null)
  const [program, setProgram] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const [syscalls, setSyscalls] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadSyscalls = async () => {
      try {
        const data = await getSyscalls()
        setSyscalls(data.syscalls || [])
      } catch (error) {
        console.error("Failed to load syscalls:", error)
      }
    }

    loadSyscalls()
  }, [])

  const runSyscall = async (name) => {
    try {
      setLoading(true)
      const data = await getSyscall(name)
      setGraph(data.flow_graph)
      setProgram(name)
    } catch (error) {
      console.error("Failed to run syscall:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <div style={styles.page(darkMode)}>
      <aside style={styles.sidebar(darkMode)}>
        <div>
          <h2 style={styles.sidebarTitle}>System Calls</h2>
          <p style={styles.sidebarSubtitle}>
            Loaded dynamically from backend executables
          </p>
        </div>

        <div style={styles.buttonList}>
          {syscalls.length > 0 ? (
            syscalls.map((call) => (
              <button
                key={call}
                onClick={() => runSyscall(call)}
                style={styles.button}
              >
                {call}()
              </button>
            ))
          ) : (
            <p style={styles.emptyText}>No syscall executables found</p>
          )}
        </div>

        <div style={styles.infoCard(darkMode)}>
          <h4 style={styles.infoTitle}>Current Program</h4>
          <p style={styles.infoValue}>{program || "None selected"}</p>

          <h4 style={styles.infoTitle}>Status</h4>
          <p style={styles.infoValue}>{loading ? "Running..." : "Idle"}</p>
        </div>

        <button onClick={toggleTheme} style={styles.themeButton}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </aside>

      <main style={styles.visualizerSection(darkMode)}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.mainTitle}>Linux System Call Visualizer</h1>
            <p style={styles.mainSubtitle}>
              Visual execution flow of Linux-based backend system calls
            </p>
          </div>
        </div>

        <div style={styles.graphContainer(darkMode)}>
          {graph ? (
            <SyscallGraph nodes={graph.nodes} edges={graph.edges} />
          ) : (
            <div style={styles.placeholder(darkMode)}>
              <h2 style={styles.placeholderTitle}>Visualizer Ready</h2>
              <p style={styles.placeholderText}>
                Select a system call from the left sidebar to render its flow.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: (dark) => ({
    display: "flex",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: dark ? "#0f172a" : "#f8fafc",
    color: dark ? "#f8fafc" : "#0f172a",
    fontFamily: "Arial, sans-serif"
  }),

  sidebar: (dark) => ({
    width: "290px",
    minWidth: "290px",
    height: "100vh",
    background: dark ? "#111827" : "#e2e8f0",
    borderRight: dark ? "1px solid #1f2937" : "1px solid #cbd5e1",
    padding: "24px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxSizing: "border-box"
  }),

  sidebarTitle: {
    margin: 0,
    fontSize: "24px"
  },

  sidebarSubtitle: {
    marginTop: "8px",
    fontSize: "13px",
    lineHeight: 1.5,
    opacity: 0.8
  },

  buttonList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    paddingRight: "4px",
    flex: 1
  },

  button: {
    background: "#22c55e",
    border: "none",
    padding: "12px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.2s"
  },

  themeButton: {
    background: "#3b82f6",
    border: "none",
    padding: "12px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    color: "white"
  },

  infoCard: (dark) => ({
    background: dark ? "#1f2937" : "#cbd5e1",
    borderRadius: "10px",
    padding: "14px"
  }),

  infoTitle: {
    margin: "0 0 6px 0",
    fontSize: "14px"
  },

  infoValue: {
    margin: "0 0 14px 0",
    fontSize: "14px",
    opacity: 0.9
  },

  visualizerSection: (dark) => ({
    flex: 1,
    height: "100vh",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    background: dark ? "#0f172a" : "#f8fafc"
  }),

  headerRow: {
    marginBottom: "20px"
  },

  mainTitle: {
    margin: 0,
    fontSize: "34px",
    fontWeight: "bold"
  },

  mainSubtitle: {
    marginTop: "8px",
    fontSize: "15px",
    opacity: 0.8
  },

  graphContainer: (dark) => ({
    flex: 1,
    width: "100%",
    height: "100%",
    background: dark ? "#111827" : "#ffffff",
    border: dark ? "1px solid #1f2937" : "1px solid #cbd5e1",
    borderRadius: "16px",
    padding: "0px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }),

  placeholder: (dark) => ({
    textAlign: "center",
    color: dark ? "#cbd5e1" : "#475569"
  }),

  placeholderTitle: {
    margin: 0,
    fontSize: "28px"
  },

  placeholderText: {
    marginTop: "10px",
    fontSize: "15px"
  },

  emptyText: {
    fontSize: "14px",
    opacity: 0.8
  }
}

export default Dashboard
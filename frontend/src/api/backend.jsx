import axios from "axios"

const API = axios.create({
  baseURL: "https://cloud-based-virtual-file-system.onrender.com"
})

export const getSyscall = async (name) => {
  const response = await API.get(`/syscall/${name}`)
  return response.data
}

export const getSyscalls = async () => {
  const response = await API.get("/syscalls")
  return response.data
}
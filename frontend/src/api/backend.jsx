import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
})

export const getSyscall = async (name) => {
  const response = await API.get(`/syscall/${name}`)
  return response.data
}

export const getSyscalls = async () => {
  const response = await API.get("/syscalls")
  return response.data
}
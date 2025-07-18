export default interface ITasks {
  taskId: string,
  name: string,
  status: "pending" | "in progress" | "completed" 
  importance: number
  type: "personal" | "work"
  deadline?: Date | null
}
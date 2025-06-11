export type Role = "admin" | "qa-lead" | "tester"

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

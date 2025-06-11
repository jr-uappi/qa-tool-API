export type ActivityAction =
  | "created"
  | "updated"
  | "deleted"
  | "executed"
  | "mapped"
  | "commented"
  | "logged-in"
  | "logged-out"

export type ActivityTargetType =
  | "project"
  | "test-suite"
  | "test-case"
  | "test-run"
  | "test-result"
  | "automated-test-result"
  | "comment"
  | "system"

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  userRole: any // Placeholder for Role type, please replace with actual import or declaration
  action: ActivityAction
  targetType: ActivityTargetType
  targetId?: string
  targetName?: string
  timestamp: Date
  details?: string // Detalhes adicionais sobre a ação
}

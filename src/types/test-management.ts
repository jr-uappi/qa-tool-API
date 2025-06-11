import type { Role } from "./auth"

export type Priority = "low" | "medium" | "high" | "critical"
export type Criticality = "low" | "medium" | "high" | "blocker"
export type TestCaseType = "manual" | "automated" | "exploratory"
export type TestRunStatus = "pending" | "in-progress" | "completed" | "aborted"
export type TestResultStatus = "passed" | "failed" | "skipped" | "blocked" | "not-run"
export type AutomatedTestStatus = "passed" | "failed" | "skipped" | "error"
export type ActivityLogType = "create" | "update" | "delete" | "execute" | "comment" | "login" | "logout"

export interface Project {
  id: string
  name: string
  description?: string
  created_at: string // ISO string from DB
  updated_at: string // ISO string from DB
  created_by: string // user ID
}

export interface TestSuite {
  id: string
  name: string
  description?: string
  parent_id?: string // Para estrutura hierárquica de sub-suites
  project_id: string // Para vincular a um projeto
  created_at: string
  updated_at: string
  created_by: string
}

export interface TestStep {
  id: string
  test_case_id: string // Foreign key to test_cases
  description: string
  expected_result: string
  step_order: number // To maintain order of steps
}

export interface Comment {
  id: string
  entity_type: "test_case" | "test_run" // Type of entity being commented on
  entity_id: string // ID of the entity (test_case_id or test_run_id)
  user_id: string
  user_name: string
  user_role: Role
  content: string
  created_at: string
}

export interface TestCase {
  id: string
  title: string
  description?: string
  priority: Priority
  criticality: Criticality
  type: TestCaseType
  input_data?: string
  output_data?: string
  suite_id?: string // Opcional, para vincular a uma suite de teste
  project_id: string // Novo: Para vincular a um projeto
  created_at: string
  updated_at: string
  created_by: string
  // Note: steps and comments are fetched separately or joined in service
}

export interface TestRunCase {
  id: string
  test_run_id: string // Foreign key to test_runs
  test_case_id: string // ID do TestCase
  status: TestResultStatus
  comments?: string
  executed_by?: string // ID do usuário que executou
  executed_at?: string
}

export interface TestRun {
  id: string
  name: string
  description?: string
  assigned_to?: string // ID do usuário/equipe atribuída
  status: TestRunStatus
  project_id: string // Novo: Para vincular a um projeto
  started_at?: string
  completed_at?: string
  created_at: string
  updated_at: string
  created_by: string
  // Note: test_run_cases are fetched separately or joined in service
}

export interface AutomatedTestResult {
  id: string
  name: string
  framework: string
  status: AutomatedTestStatus
  duration: number
  error_message?: string
  timestamp: string
  linked_test_case_id?: string // ID do TestCase manual/automatizado correspondente no QA Tool
  project_id: string // Novo: Para vincular a um projeto
  created_at: string
}

export interface ActivityLog {
  id: string
  user_id: string
  user_name: string
  user_role: Role
  action_type: ActivityLogType
  entity_type: string // e.g., 'project', 'test_case', 'test_run'
  entity_id: string
  description: string
  project_id?: string // Opcional, para logs relacionados a um projeto específico
  created_at: string
}

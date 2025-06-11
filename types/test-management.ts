export type Priority = "low" | "medium" | "high" | "critical"
export type Criticality = "low" | "medium" | "high" | "blocker"
export type TestCaseType = "manual" | "automated" | "exploratory"

export interface TestStep {
  id: string // Para identificação única de cada etapa no formulário
  description: string
  expectedResult: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userRole: string // Role do usuário no momento do comentário
  content: string
  createdAt: Date
}

export interface TestCase {
  id: string
  title: string
  description?: string
  priority: Priority
  criticality: Criticality
  type: TestCaseType
  steps: TestStep[]
  inputData?: string
  outputData?: string
  suiteId?: string // Opcional, para vincular a uma suite de teste
  comments: Comment[] // Novo: Array de comentários
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface TestSuite {
  id: string
  name: string
  description?: string
  parentId?: string // Para estrutura hierárquica de sub-suites
  projectId?: string // Novo: Para vincular a um projeto
  createdAt: Date
  updatedAt: Date
}

// --- Novas interfaces para Test Runs ---

export type TestRunStatus = "pending" | "in-progress" | "completed" | "aborted"
export type TestResultStatus = "passed" | "failed" | "skipped" | "blocked" | "not-run"

export interface TestRunCase {
  testCaseId: string // ID do TestCase
  status: TestResultStatus
  comments?: string
  executedBy?: string // ID ou nome do usuário que executou
  executedAt?: Date
}

export interface TestRun {
  id: string
  name: string
  description?: string
  assignedTo?: string // ID ou nome do usuário/equipe atribuída
  status: TestRunStatus
  testCases: TestRunCase[] // Array de casos de teste incluídos nesta execução
  startedAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// --- Novas interfaces para Mapeamento de Testes Automatizados ---

export type AutomatedTestStatus = "passed" | "failed" | "skipped" | "error"

export interface AutomatedTestResult {
  id: string // ID único para este resultado de teste automatizado (ex: hash do nome do teste + framework)
  name: string // Nome do teste vindo do framework de automação (ex: "should login with valid credentials")
  framework: string // Ex: "JUnit", "Playwright", "Cypress"
  status: AutomatedTestStatus // Status do resultado do teste automatizado
  duration: number // Duração em segundos
  errorMessage?: string // Mensagem de erro se falhou
  timestamp: Date // Quando o teste foi executada
  linkedTestCaseId?: string // ID do TestCase manual/automatizado correspondente no QA Tool
}

export interface AutomatedTestMapping {
  automatedTestResultId: string // ID do AutomatedTestResult
  testCaseId: string // ID do TestCase no QA Tool
}

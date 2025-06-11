import { Injectable, NotFoundException } from "@nestjs/common"
import type { SupabaseService } from "../auth/supabase.service"
import type { CreateTestCaseDto } from "../dto/create-test-case.dto"
import type { UpdateTestCaseDto } from "../dto/update-test-case.dto"
import type { TestCase, TestStep } from "../types/test-management"

@Injectable()
export class TestCasesService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createTestCaseDto: CreateTestCaseDto, userId: string): Promise<TestCase> {
    const { steps, ...testCaseData } = createTestCaseDto

    const { data: testCase, error: testCaseError } = await this.supabaseService.supabase
      .from("test_cases")
      .insert({ ...testCaseData, created_by: userId })
      .select()
      .single()

    if (testCaseError) {
      throw new Error(`Failed to create test case: ${testCaseError.message}`)
    }

    if (steps && steps.length > 0) {
      const stepsToInsert = steps.map((step, index) => ({
        ...step,
        test_case_id: testCase.id,
        step_order: index,
      }))
      const { error: stepsError } = await this.supabaseService.supabase.from("test_steps").insert(stepsToInsert)

      if (stepsError) {
        // Consider rolling back testCase creation if steps fail
        await this.supabaseService.supabase.from("test_cases").delete().eq("id", testCase.id)
        throw new Error(`Failed to create test steps: ${stepsError.message}`)
      }
    }

    return { ...testCase, steps: steps as TestStep[] } // Return with steps for consistency
  }

  async findAll(projectId: string, suiteId?: string): Promise<TestCase[]> {
    let query = this.supabaseService.supabase
      .from("test_cases")
      .select("*, test_steps(*)") // Select test cases and their steps
      .eq("project_id", projectId)

    if (suiteId) {
      query = query.eq("suite_id", suiteId)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch test cases: ${error.message}`)
    }
    return data as TestCase[] // Cast to TestCase[] as steps are joined
  }

  async findOne(id: string): Promise<TestCase> {
    const { data, error } = await this.supabaseService.supabase
      .from("test_cases")
      .select("*, test_steps(*)") // Select test case and its steps
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Test Case with ID "${id}" not found.`)
      }
      throw new Error(`Failed to fetch test case: ${error.message}`)
    }
    return data as TestCase // Cast to TestCase as steps are joined
  }

  async update(id: string, updateTestCaseDto: UpdateTestCaseDto): Promise<TestCase> {
    const { steps, ...testCaseData } = updateTestCaseDto

    const { data: testCase, error: testCaseError } = await this.supabaseService.supabase
      .from("test_cases")
      .update(testCaseData)
      .eq("id", id)
      .select()
      .single()

    if (testCaseError) {
      if (testCaseError.code === "PGRST116") {
        throw new NotFoundException(`Test Case with ID "${id}" not found.`)
      }
      throw new Error(`Failed to update test case: ${testCaseError.message}`)
    }

    if (steps !== undefined) {
      // Delete existing steps for this test case
      await this.supabaseService.supabase.from("test_steps").delete().eq("test_case_id", id)

      if (steps.length > 0) {
        // Insert new steps
        const stepsToInsert = steps.map((step, index) => ({
          ...step,
          test_case_id: testCase.id,
          step_order: index,
        }))
        const { error: stepsError } = await this.supabaseService.supabase.from("test_steps").insert(stepsToInsert)

        if (stepsError) {
          throw new Error(`Failed to update test steps: ${stepsError.message}`)
        }
      }
    }

    return { ...testCase, steps: steps as TestStep[] } // Return with updated steps
  }

  async remove(id: string): Promise<void> {
    // Supabase cascade delete should handle test_steps and comments
    const { error } = await this.supabaseService.supabase.from("test_cases").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete test case: ${error.message}`)
    }
  }
}

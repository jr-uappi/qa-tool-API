import { Injectable, NotFoundException } from "@nestjs/common"
import { SupabaseService } from "../auth/supabase.service"
import { CreateTestRunDto } from "../dto/create-test-run.dto"
import { UpdateTestRunDto } from "../dto/update-test-run.dto"
import type { TestRun, TestRunCase } from "../types/test-management"

@Injectable()
export class TestRunsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createTestRunDto: CreateTestRunDto, userId: string): Promise<TestRun> {
    const { test_cases, ...testRunData } = createTestRunDto

    const { data: testRun, error: testRunError } = await this.supabaseService.supabase
      .from("test_runs")
      .insert({ ...testRunData, created_by: userId })
      .select()
      .single()

    if (testRunError) {
      throw new Error(`Failed to create test run: ${testRunError.message}`)
    }

    if (test_cases && test_cases.length > 0) {
      const testRunCasesToInsert = test_cases.map((trCase) => ({
        ...trCase,
        test_run_id: testRun.id,
      }))
      const { error: trcError } = await this.supabaseService.supabase
        .from("test_run_cases")
        .insert(testRunCasesToInsert)

      if (trcError) {
        // Consider rolling back testRun creation if test_run_cases fail
        await this.supabaseService.supabase.from("test_runs").delete().eq("id", testRun.id)
        throw new Error(`Failed to create test run cases: ${trcError.message}`)
      }
    }

    return { ...testRun, test_cases: test_cases as TestRunCase[] } // Return with cases for consistency
  }

  async findAll(projectId: string): Promise<TestRun[]> {
    const { data, error } = await this.supabaseService.supabase
      .from("test_runs")
      .select("*, test_run_cases(*)") // Join with test_run_cases
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch test runs: ${error.message}`)
    }
    return data as TestRun[]
  }

  async findOne(id: string): Promise<TestRun> {
    const { data, error } = await this.supabaseService.supabase
      .from("test_runs")
      .select("*, test_run_cases(*)")
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Test Run with ID "${id}" not found.`)
      }
      throw new Error(`Failed to fetch test run: ${error.message}`)
    }
    return data as TestRun
  }

  async update(id: string, updateTestRunDto: UpdateTestRunDto): Promise<TestRun> {
    const { test_cases, ...testRunData } = updateTestRunDto

    const { data: testRun, error: testRunError } = await this.supabaseService.supabase
      .from("test_runs")
      .update(testRunData)
      .eq("id", id)
      .select()
      .single()

    if (testRunError) {
      if (testRunError.code === "PGRST116") {
        throw new NotFoundException(`Test Run with ID "${id}" not found.`)
      }
      throw new Error(`Failed to update test run: ${testRunError.message}`)
    }

    if (test_cases !== undefined) {
      // Delete existing test run cases for this run
      await this.supabaseService.supabase.from("test_run_cases").delete().eq("test_run_id", id)

      if (test_cases.length > 0) {
        // Insert new test run cases
        const testRunCasesToInsert = test_cases.map((trCase) => ({
          ...trCase,
          test_run_id: testRun.id,
        }))
        const { error: trcError } = await this.supabaseService.supabase
          .from("test_run_cases")
          .insert(testRunCasesToInsert)

        if (trcError) {
          throw new Error(`Failed to update test run cases: ${trcError.message}`)
        }
      }
    }

    return { ...testRun, test_cases: test_cases as TestRunCase[] }
  }

  async remove(id: string): Promise<void> {
    // Supabase cascade delete should handle test_run_cases
    const { error } = await this.supabaseService.supabase.from("test_runs").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete test run: ${error.message}`)
    }
  }
}

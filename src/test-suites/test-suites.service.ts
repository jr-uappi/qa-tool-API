import { Injectable, NotFoundException } from "@nestjs/common"
import type { SupabaseService } from "../auth/supabase.service"
import type { CreateTestSuiteDto } from "../dto/create-test-suite.dto"
import type { UpdateTestSuiteDto } from "../dto/update-test-suite.dto"
import type { TestSuite } from "../types/test-management"

@Injectable()
export class TestSuitesService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createTestSuiteDto: CreateTestSuiteDto, userId: string): Promise<TestSuite> {
    const { data, error } = await this.supabaseService.supabase
      .from("test_suites")
      .insert({ ...createTestSuiteDto, created_by: userId })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create test suite: ${error.message}`)
    }
    return data
  }

  async findAll(projectId: string): Promise<TestSuite[]> {
    const { data, error } = await this.supabaseService.supabase
      .from("test_suites")
      .select("*")
      .eq("project_id", projectId)

    if (error) {
      throw new Error(`Failed to fetch test suites: ${error.message}`)
    }
    return data
  }

  async findOne(id: string): Promise<TestSuite> {
    const { data, error } = await this.supabaseService.supabase.from("test_suites").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Test Suite with ID "${id}" not found.`)
      }
      throw new Error(`Failed to fetch test suite: ${error.message}`)
    }
    return data
  }

  async update(id: string, updateTestSuiteDto: UpdateTestSuiteDto): Promise<TestSuite> {
    const { data, error } = await this.supabaseService.supabase
      .from("test_suites")
      .update(updateTestSuiteDto)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Test Suite with ID "${id}" not found.`)
      }
      throw new Error(`Failed to update test suite: ${error.message}`)
    }
    return data
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabaseService.supabase.from("test_suites").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete test suite: ${error.message}`)
    }
  }
}

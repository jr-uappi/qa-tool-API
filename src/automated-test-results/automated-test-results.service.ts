import { Injectable, NotFoundException } from "@nestjs/common"
import type { SupabaseService } from "../auth/supabase.service"
import type { CreateAutomatedTestResultDto } from "../dto/create-automated-test-result.dto"
import type { UpdateAutomatedTestResultDto } from "../dto/update-automated-test-result.dto"
import type { AutomatedTestResult } from "../types/test-management"

@Injectable()
export class AutomatedTestResultsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createAutomatedTestResultDto: CreateAutomatedTestResultDto): Promise<AutomatedTestResult> {
    const { data, error } = await this.supabaseService.supabase
      .from("automated_test_results")
      .insert(createAutomatedTestResultDto)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create automated test result: ${error.message}`)
    }
    return data
  }

  async findAll(projectId: string): Promise<AutomatedTestResult[]> {
    const { data, error } = await this.supabaseService.supabase
      .from("automated_test_results")
      .select("*")
      .eq("project_id", projectId)
      .order("timestamp", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch automated test results: ${error.message}`)
    }
    return data
  }

  async findOne(id: string): Promise<AutomatedTestResult> {
    const { data, error } = await this.supabaseService.supabase
      .from("automated_test_results")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Automated Test Result with ID "${id}" not found.`)
      }
      throw new Error(`Failed to fetch automated test result: ${error.message}`)
    }
    return data
  }

  async update(id: string, updateAutomatedTestResultDto: UpdateAutomatedTestResultDto): Promise<AutomatedTestResult> {
    const { data, error } = await this.supabaseService.supabase
      .from("automated_test_results")
      .update(updateAutomatedTestResultDto)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Automated Test Result with ID "${id}" not found.`)
      }
      throw new Error(`Failed to update automated test result: ${error.message}`)
    }
    return data
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabaseService.supabase.from("automated_test_results").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete automated test result: ${error.message}`)
    }
  }
}

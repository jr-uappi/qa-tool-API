import { Injectable, NotFoundException } from "@nestjs/common"
import { SupabaseService } from "../auth/supabase.service"
import { CreateProjectDto } from "../dto/create-project.dto"
import { UpdateProjectDto } from "../dto/update-project.dto"
import type { Project } from "../types/test-management"

@Injectable()
export class ProjectsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
    const { data, error } = await this.supabaseService.supabase
      .from("projects")
      .insert({ ...createProjectDto, created_by: userId })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create project: ${error.message}`)
    }
    return data
  }

  async findAll(userId: string, userRole: string): Promise<Project[]> {
    const query = this.supabaseService.supabase.from("projects").select("*")

    // RLS já deve lidar com isso, mas podemos adicionar uma camada extra se necessário
    // Por exemplo, se um 'tester' só pode ver projetos que ele criou ou foi atribuído
    // Por enquanto, confiamos no RLS para filtrar por created_by ou outras políticas.

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`)
    }
    return data
  }

  async findOne(id: string): Promise<Project> {
    const { data, error } = await this.supabaseService.supabase.from("projects").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found
        throw new NotFoundException(`Project with ID "${id}" not found.`)
      }
      throw new Error(`Failed to fetch project: ${error.message}`)
    }
    return data
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const { data, error } = await this.supabaseService.supabase
      .from("projects")
      .update(updateProjectDto)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Project with ID "${id}" not found.`)
      }
      throw new Error(`Failed to update project: ${error.message}`)
    }
    return data
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabaseService.supabase.from("projects").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete project: ${error.message}`)
    }
  }
}

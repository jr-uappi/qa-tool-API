import { Injectable, NotFoundException } from "@nestjs/common"
import type { SupabaseService } from "../auth/supabase.service"
import type { CreateCommentDto } from "../dto/create-comment.dto"
import type { UpdateCommentDto } from "../dto/update-comment.dto"
import type { Comment } from "../types/test-management"
import type { User } from "../types/auth"

@Injectable()
export class CommentsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const { data, error } = await this.supabaseService.supabase
      .from("comments")
      .insert({
        ...createCommentDto,
        user_id: user.id,
        user_name: user.name || user.email, // Use name if available, else email
        user_role: user.role,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create comment: ${error.message}`)
    }
    return data
  }

  async findAllForEntity(entityType: "test_case" | "test_run", entityId: string): Promise<Comment[]> {
    const { data, error } = await this.supabaseService.supabase
      .from("comments")
      .select("*")
      .eq("entity_type", entityType)
      .eq("entity_id", entityId)
      .order("created_at", { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch comments: ${error.message}`)
    }
    return data
  }

  async findOne(id: string): Promise<Comment> {
    const { data, error } = await this.supabaseService.supabase.from("comments").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Comment with ID "${id}" not found.`)
      }
      throw new Error(`Failed to fetch comment: ${error.message}`)
    }
    return data
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const { data, error } = await this.supabaseService.supabase
      .from("comments")
      .update(updateCommentDto)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundException(`Comment with ID "${id}" not found.`)
      }
      throw new Error(`Failed to update comment: ${error.message}`)
    }
    return data
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabaseService.supabase.from("comments").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete comment: ${error.message}`)
    }
  }
}

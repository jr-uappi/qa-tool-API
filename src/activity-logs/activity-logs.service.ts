import { Injectable } from "@nestjs/common"
import type { SupabaseService } from "../auth/supabase.service"
import type { CreateActivityLogDto } from "../dto/create-activity-log.dto"
import type { ActivityLog } from "../types/test-management"
import type { User } from "../types/auth"

@Injectable()
export class ActivityLogsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createActivityLogDto: CreateActivityLogDto, user: User): Promise<ActivityLog> {
    const { data, error } = await this.supabaseService.supabase
      .from("activity_logs")
      .insert({
        ...createActivityLogDto,
        user_id: user.id,
        user_name: user.name || user.email,
        user_role: user.role,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create activity log: ${error.message}`)
    }
    return data
  }

  async findAll(projectId?: string): Promise<ActivityLog[]> {
    let query = this.supabaseService.supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })

    if (projectId) {
      query = query.eq("project_id", projectId)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch activity logs: ${error.message}`)
    }
    return data
  }
}

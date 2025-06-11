import { Injectable } from "@nestjs/common"
import { SupabaseService } from "../auth/supabase.service"
import type { Role } from "../types/auth" // Importar Role

@Injectable()
export class UsersService {
  constructor(private supabaseService: SupabaseService) {}

  async findAllProfiles() {
    const { data, error } = await this.supabaseService.supabase.from("profiles").select("id, name, email, role")

    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  async updateProfileRole(userId: string, newRole: Role) {
    const { data, error } = await this.supabaseService.supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
}

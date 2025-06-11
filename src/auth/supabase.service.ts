import { Injectable, type OnModuleInit } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

@Injectable()
export class SupabaseService implements OnModuleInit {
  public supabase: SupabaseClient

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const supabaseUrl = this.configService.get<string>("SUPABASE_URL")
    const supabaseKey = this.configService.get<string>("SUPABASE_SERVICE_ROLE_KEY")

    console.log("Supabase URL:", supabaseUrl)
    console.log("Supabase KEY:", supabaseKey)

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase URL or Key not found in environment variables.")
    }

    this.supabase = createClient(supabaseUrl, supabaseKey)
  }
}

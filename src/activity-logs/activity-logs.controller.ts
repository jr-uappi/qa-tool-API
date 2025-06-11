import { Controller, Get, Post, Body, UseGuards, Req, Query } from "@nestjs/common"
import { ActivityLogsService } from "./activity-logs.service"
import { CreateActivityLogDto } from "../dto/create-activity-log.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { RolesGuard } from "../auth/roles.guard"
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger"

@ApiTags("activity-logs")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("activity-logs")
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @Post()
  async create(@Body() createActivityLogDto: CreateActivityLogDto, @Req() req) {
    return this.activityLogsService.create(createActivityLogDto, req.user)
  }

  @Get()
  @ApiQuery({ name: "projectId", required: false, type: String, description: "Filter by project ID" })
  async findAll(@Query("projectId") projectId?: string) {
    return this.activityLogsService.findAll(projectId)
  }
}

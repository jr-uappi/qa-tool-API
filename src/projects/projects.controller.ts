import { Controller, Get, Post, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common"
import type { ProjectsService } from "./projects.service"
import type { CreateProjectDto } from "../dto/create-project.dto"
import type { UpdateProjectDto } from "../dto/update-project.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { RolesGuard } from "../auth/roles.guard"
import { Roles } from "../auth/roles.decorator"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("projects")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles("admin", "qa-lead")
  async create(createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectsService.create(createProjectDto, req.user.id)
  }

  @Get()
  @Roles("admin", "qa-lead", "tester")
  async findAll(@Req() req) {
    return this.projectsService.findAll(req.user.id, req.user.role)
  }

  @Get(":id")
  @Roles("admin", "qa-lead", "tester")
  async findOne(@Param("id") id: string) {
    return this.projectsService.findOne(id)
  }

  @Patch(":id")
  @Roles("admin", "qa-lead")
  async update(@Param("id") id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto)
  }

  @Delete(":id")
  @Roles("admin")
  async remove(@Param("id") id: string) {
    await this.projectsService.remove(id)
    return { message: "Project deleted successfully" }
  }
}

import { Controller, Get, Post, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { AutomatedTestResultsService } from "./automated-test-results.service"
import { CreateAutomatedTestResultDto } from "../dto/create-automated-test-result.dto"
import { UpdateAutomatedTestResultDto } from "../dto/update-automated-test-result.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { RolesGuard } from "../auth/roles.guard"
import { Roles } from "../auth/roles.decorator"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("automated-test-results")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("automated-test-results")
export class AutomatedTestResultsController {
  constructor(private readonly automatedTestResultsService: AutomatedTestResultsService) {}

  @Post()
  async create(createAutomatedTestResultDto: CreateAutomatedTestResultDto) {
    return this.automatedTestResultsService.create(createAutomatedTestResultDto)
  }

  @Get("by-project/:projectId")
  @Roles("admin", "qa-lead", "tester")
  async findAllByProject(@Param("projectId") projectId: string) {
    return this.automatedTestResultsService.findAll(projectId)
  }

  @Get(":id")
  @Roles("admin", "qa-lead", "tester")
  async findOne(@Param("id") id: string) {
    return this.automatedTestResultsService.findOne(id)
  }

  @Patch(":id")
  @Roles("admin", "qa-lead")
  async update(@Param("id") id: string, updateAutomatedTestResultDto: UpdateAutomatedTestResultDto) {
    return this.automatedTestResultsService.update(id, updateAutomatedTestResultDto)
  }

  @Delete(":id")
  @Roles("admin")
  async remove(@Param("id") id: string) {
    await this.automatedTestResultsService.remove(id)
    return { message: "Automated Test Result deleted successfully" }
  }
}

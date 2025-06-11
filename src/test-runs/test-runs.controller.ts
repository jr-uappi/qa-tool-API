import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common"
import { TestRunsService } from "./test-runs.service"
import { CreateTestRunDto } from "../dto/create-test-run.dto"
import { UpdateTestRunDto } from "../dto/update-test-run.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { RolesGuard } from "../auth/roles.guard"
import { Roles } from "../auth/roles.decorator"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("test-runs")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("test-runs")
export class TestRunsController {
  constructor(private readonly testRunsService: TestRunsService) {}

  @Post()
  @Roles("admin", "qa-lead")
  async create(@Body() createTestRunDto: CreateTestRunDto, @Req() req) {
    return this.testRunsService.create(createTestRunDto, req.user.id)
  }

  @Get("by-project/:projectId")
  @Roles("admin", "qa-lead", "tester")
  async findAllByProject(@Param("projectId") projectId: string) {
    return this.testRunsService.findAll(projectId)
  }

  @Get(":id")
  @Roles("admin", "qa-lead", "tester")
  async findOne(@Param("id") id: string) {
    return this.testRunsService.findOne(id)
  }

  @Patch(":id")
  @Roles("admin", "qa-lead", "tester") // Testers can update status/comments of their assigned runs
  async update(@Param("id") id: string, @Body() updateTestRunDto: UpdateTestRunDto) {
    return this.testRunsService.update(id, updateTestRunDto)
  }

  @Delete(":id")
  @Roles("admin")
  async remove(@Param("id") id: string) {
    await this.testRunsService.remove(id)
    return { message: "Test Run deleted successfully" }
  }
}

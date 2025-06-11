import { Controller, Get, Post, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common"
import type { TestSuitesService } from "./test-suites.service"
import type { CreateTestSuiteDto } from "../dto/create-test-suite.dto"
import type { UpdateTestSuiteDto } from "../dto/update-test-suite.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { RolesGuard } from "../auth/roles.guard"
import { Roles } from "../auth/roles.decorator"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("test-suites")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("test-suites")
export class TestSuitesController {
  constructor(private readonly testSuitesService: TestSuitesService) {}

  @Post()
  @Roles("admin", "qa-lead")
  async create(createTestSuiteDto: CreateTestSuiteDto, @Req() req) {
    return this.testSuitesService.create(createTestSuiteDto, req.user.id)
  }

  @Get("by-project/:projectId")
  @Roles("admin", "qa-lead", "tester")
  async findAllByProject(@Param("projectId") projectId: string) {
    return this.testSuitesService.findAll(projectId)
  }

  @Get(":id")
  @Roles("admin", "qa-lead", "tester")
  async findOne(@Param("id") id: string) {
    return this.testSuitesService.findOne(id)
  }

  @Patch(":id")
  @Roles("admin", "qa-lead")
  async update(@Param("id") id: string, updateTestSuiteDto: UpdateTestSuiteDto) {
    return this.testSuitesService.update(id, updateTestSuiteDto)
  }

  @Delete(":id")
  @Roles("admin")
  async remove(@Param("id") id: string) {
    await this.testSuitesService.remove(id)
    return { message: "Test Suite deleted successfully" }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from "@nestjs/common"
import { TestCasesService } from "./test-cases.service"
import { CreateTestCaseDto } from "../dto/create-test-case.dto"
import { UpdateTestCaseDto } from "../dto/update-test-case.dto"
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger"

@ApiTags("test-cases")
@ApiBearerAuth()
@Controller("test-cases")
export class TestCasesController {
  constructor(private readonly testCasesService: TestCasesService) {}

  @Post()
  async create(@Body() createTestCaseDto: CreateTestCaseDto, @Req() req) {
    return this.testCasesService.create(createTestCaseDto, req.user.id)
  }

  @Get("by-project/:projectId")
  @ApiQuery({ name: "suiteId", required: false, type: String, description: "Filter by test suite ID" })
  async findAllByProject(@Param("projectId") projectId: string, @Query("suiteId") suiteId?: string) {
    return this.testCasesService.findAll(projectId, suiteId)
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.testCasesService.findOne(id)
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateTestCaseDto: UpdateTestCaseDto) {
    return this.testCasesService.update(id, updateTestCaseDto)
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.testCasesService.remove(id)
    return { message: "Test Case deleted successfully" }
  }
}

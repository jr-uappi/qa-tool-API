import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, ValidateNested, ArrayMinSize } from "class-validator"
import { Type } from "class-transformer"
import { TestRunStatus } from "../types/test-management"
import { CreateTestRunCaseDto } from "./create-test-run-case.dto"

export class CreateTestRunDto {
  @ApiProperty({ description: "The name of the test run", example: "Regression Test Cycle 1" })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: "A brief description of the test run",
    required: false,
    example: "Full regression test for release v1.0.",
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: "The ID of the user or team assigned to this test run", required: false, format: "uuid" })
  @IsUUID()
  @IsOptional()
  assigned_to?: string

  @ApiProperty({ enum: TestRunStatus, description: "The current status of the test run", example: "pending" })
  @IsEnum(TestRunStatus)
  status: TestRunStatus

  @ApiProperty({ type: [CreateTestRunCaseDto], description: "A list of test cases included in this run" })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTestRunCaseDto)
  test_cases: CreateTestRunCaseDto[]

  @ApiProperty({ description: "The ID of the project this test run belongs to", format: "uuid" })
  @IsUUID()
  @IsNotEmpty()
  project_id: string
}

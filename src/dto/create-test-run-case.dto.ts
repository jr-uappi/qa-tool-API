import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsEnum, IsOptional, IsString } from "class-validator"
import { TestResultStatus } from "../types/test-management"

export class CreateTestRunCaseDto {
  @ApiProperty({ description: "The ID of the test case", format: "uuid" })
  @IsUUID()
  test_case_id: string

  @ApiProperty({ enum: TestResultStatus, description: "The status of the test case in this run", example: "not-run" })
  @IsEnum(TestResultStatus)
  status: TestResultStatus

  @ApiProperty({
    description: "Comments about the execution of this test case",
    required: false,
    example: "Found a minor UI bug.",
  })
  @IsString()
  @IsOptional()
  comments?: string

  @ApiProperty({ description: "The ID of the user who executed this test case", required: false, format: "uuid" })
  @IsUUID()
  @IsOptional()
  executed_by?: string
}

import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsUUID, IsDateString } from "class-validator"
import { AutomatedTestStatus } from "../types/test-management"

export class CreateAutomatedTestResultDto {
  @ApiProperty({ description: "The name of the automated test", example: "should login with valid credentials" })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: "The automation framework used (e.g., JUnit, Playwright, Cypress)",
    example: "Playwright",
  })
  @IsString()
  @IsNotEmpty()
  framework: string

  @ApiProperty({ enum: AutomatedTestStatus, description: "The status of the automated test result", example: "passed" })
  @IsEnum(AutomatedTestStatus)
  status: AutomatedTestStatus

  @ApiProperty({ description: "The duration of the test in seconds", example: 1.5 })
  @IsNumber()
  duration: number

  @ApiProperty({ description: "Error message if the test failed", required: false, example: "Element not found" })
  @IsString()
  @IsOptional()
  error_message?: string

  @ApiProperty({
    description: "Timestamp of when the test was executed (ISO 8601 format)",
    example: "2023-10-27T10:00:00Z",
  })
  @IsDateString()
  @IsNotEmpty()
  timestamp: string

  @ApiProperty({
    description: "The ID of the linked manual/automated test case in QA Tool",
    required: false,
    format: "uuid",
  })
  @IsUUID()
  @IsOptional()
  linked_test_case_id?: string

  @ApiProperty({ description: "The ID of the project this automated test result belongs to", format: "uuid" })
  @IsUUID()
  @IsNotEmpty()
  project_id: string
}

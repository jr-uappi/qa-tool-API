import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, ValidateNested, ArrayMinSize } from "class-validator"
import { Type } from "class-transformer"
import { Priority, Criticality, TestCaseType } from "../types/test-management"
import { CreateTestStepDto } from "./create-test-step.dto"

export class CreateTestCaseDto {
  @ApiProperty({ description: "The title of the test case", example: "Verify user login with valid credentials" })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: "A detailed description of the test case",
    required: false,
    example: "This test case verifies the successful login of a user using valid email and password.",
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ enum: Priority, description: "The priority of the test case", example: "high" })
  @IsEnum(Priority)
  priority: Priority

  @ApiProperty({ enum: Criticality, description: "The criticality of the test case", example: "blocker" })
  @IsEnum(Criticality)
  criticality: Criticality

  @ApiProperty({ enum: TestCaseType, description: "The type of the test case", example: "manual" })
  @IsEnum(TestCaseType)
  type: TestCaseType

  @ApiProperty({ type: [CreateTestStepDto], description: "A list of steps for the test case" })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTestStepDto)
  steps: CreateTestStepDto[]

  @ApiProperty({
    description: "Input data required for the test case",
    required: false,
    example: "{ email: 'test@example.com', password: 'password123' }",
  })
  @IsString()
  @IsOptional()
  input_data?: string

  @ApiProperty({
    description: "Expected output data after executing the test case",
    required: false,
    example: "{ success: true, message: 'Login successful' }",
  })
  @IsString()
  @IsOptional()
  output_data?: string

  @ApiProperty({ description: "The ID of the test suite this test case belongs to", required: false, format: "uuid" })
  @IsUUID()
  @IsOptional()
  suite_id?: string

  @ApiProperty({ description: "The ID of the project this test case belongs to", format: "uuid" })
  @IsUUID()
  @IsNotEmpty()
  project_id: string
}

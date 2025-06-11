import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsUUID, MaxLength } from "class-validator"

export class CreateTestSuiteDto {
  @ApiProperty({ description: "The name of the test suite", example: "User Authentication Suite" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @ApiProperty({
    description: "A brief description of the test suite",
    required: false,
    example: "Contains test cases related to user login, registration, and password reset.",
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    description: "The ID of the parent test suite (for hierarchical structure)",
    required: false,
    format: "uuid",
  })
  @IsUUID()
  @IsOptional()
  parent_id?: string

  @ApiProperty({ description: "The ID of the project this test suite belongs to", format: "uuid" })
  @IsUUID()
  @IsNotEmpty()
  project_id: string
}

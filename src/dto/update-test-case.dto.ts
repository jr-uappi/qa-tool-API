// update-test-case.dto.ts
import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsUUID, IsEnum, ValidateNested, ArrayMinSize } from "class-validator"
import { Type } from "class-transformer"
import { Priority, Criticality, TestCaseType } from "../types/test-management"
import { PartialType } from "@nestjs/mapped-types"
import { CreateTestStepDto } from "./create-test-step.dto"

export class UpdateTestCaseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority

  @ApiProperty()
  @IsOptional()
  @IsEnum(Criticality)
  criticality?: Criticality

  @ApiProperty()
  @IsOptional()
  @IsEnum(TestCaseType)
  type?: TestCaseType

  @ApiProperty({ type: [CreateTestStepDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTestStepDto)
  steps?: Partial<CreateTestStepDto>[]

  @ApiProperty()
  @IsOptional()
  @IsString()
  input_data?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  output_data?: string

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  suite_id?: string

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  project_id?: string
}

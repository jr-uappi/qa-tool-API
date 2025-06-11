import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, ValidateNested, ArrayMinSize, IsString, IsUUID } from "class-validator"
import { Type } from "class-transformer"
import { CreateTestRunCaseDto } from "./create-test-run-case.dto"

export class UpdateTestRunDto {
  @ApiProperty({ description: "The name of the test run", required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ description: "The ID of the related test plan", required: false, format: "uuid" })
  @IsOptional()
  @IsUUID()
  test_plan_id?: string

  @ApiProperty({
    type: [CreateTestRunCaseDto],
    description: "A list of test cases included in this run",
    required: false,
  })
  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTestRunCaseDto)
  test_cases?: Partial<CreateTestRunCaseDto>[]
}

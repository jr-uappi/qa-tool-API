import { PartialType } from "@nestjs/mapped-types"
import { CreateTestRunDto } from "./create-test-run.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, ValidateNested, ArrayMinSize } from "class-validator"
import { Type } from "class-transformer"
import { UpdateTestRunCaseDto } from "./update-test-run-case.dto"

export class UpdateTestRunDto extends PartialType(CreateTestRunDto) {
  @ApiProperty({
    type: [UpdateTestRunCaseDto],
    description: "A list of test cases included in this run",
    required: false,
  })
  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateTestRunCaseDto)
  test_cases?: UpdateTestRunCaseDto[]
}

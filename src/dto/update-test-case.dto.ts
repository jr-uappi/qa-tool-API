import { PartialType } from "@nestjs/mapped-types"
import { CreateTestCaseDto } from "./create-test-case.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, ValidateNested, ArrayMinSize } from "class-validator"
import { Type } from "class-transformer"
import { UpdateTestStepDto } from "./update-test-step.dto"

export class UpdateTestCaseDto extends PartialType(CreateTestCaseDto) {
  @ApiProperty({ type: [UpdateTestStepDto], description: "A list of steps for the test case", required: false })
  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateTestStepDto)
  steps?: UpdateTestStepDto[]
}

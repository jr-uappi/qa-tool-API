import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsInt, Min } from "class-validator"

export class CreateTestStepDto {
  @ApiProperty({ description: "Description of the test step", example: "Navigate to the login page" })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ description: "Expected result of the test step", example: "Login page is displayed" })
  @IsString()
  @IsNotEmpty()
  expected_result: string

  @ApiProperty({ description: "Order of the step within the test case", example: 1 })
  @IsInt()
  @Min(0)
  step_order: number
}

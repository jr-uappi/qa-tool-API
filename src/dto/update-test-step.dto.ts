import { PartialType } from "@nestjs/mapped-types"
import { CreateTestStepDto } from "./create-test-step.dto"

export class UpdateTestStepDto extends PartialType(CreateTestStepDto) {}

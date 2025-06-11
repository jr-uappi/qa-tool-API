import { PartialType } from "@nestjs/mapped-types"
import { CreateTestRunCaseDto } from "./create-test-run-case.dto"

export class UpdateTestRunCaseDto extends PartialType(CreateTestRunCaseDto) {}

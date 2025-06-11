import { PartialType } from "@nestjs/mapped-types"
import { CreateAutomatedTestResultDto } from "./create-automated-test-result.dto"

export class UpdateAutomatedTestResultDto extends PartialType(CreateAutomatedTestResultDto) {}

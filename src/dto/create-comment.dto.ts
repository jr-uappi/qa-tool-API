import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsUUID, IsEnum } from "class-validator"

export class CreateCommentDto {
  @ApiProperty({
    enum: ["test_case", "test_run"],
    description: "The type of entity being commented on",
    example: "test_case",
  })
  @IsEnum(["test_case", "test_run"])
  entity_type: "test_case" | "test_run"

  @ApiProperty({ description: "The ID of the entity (test_case_id or test_run_id)", format: "uuid" })
  @IsUUID()
  @IsNotEmpty()
  entity_id: string

  @ApiProperty({ description: "The content of the comment", example: "Found a critical bug during execution." })
  @IsString()
  @IsNotEmpty()
  content: string
}

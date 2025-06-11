import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsEnum } from "class-validator"
import { ActivityLogType } from "../types/test-management"

export class CreateActivityLogDto {
  @ApiProperty({ description: "The type of action performed", enum: ActivityLogType, example: "create" })
  @IsEnum(ActivityLogType)
  action_type: ActivityLogType

  @ApiProperty({ description: "The type of entity affected (e.g., 'project', 'test_case')", example: "project" })
  @IsString()
  @IsNotEmpty()
  entity_type: string

  @ApiProperty({ description: "The ID of the entity affected", format: "uuid" })
  @IsUUID()
  @IsNotEmpty()
  entity_id: string

  @ApiProperty({ description: "A description of the activity", example: "Created new project 'My Project'" })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: "The ID of the project related to this activity (optional)",
    required: false,
    format: "uuid",
  })
  @IsUUID()
  @IsOptional()
  project_id?: string
}

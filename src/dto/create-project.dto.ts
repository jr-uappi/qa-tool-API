import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator"

export class CreateProjectDto {
  @ApiProperty({ description: "The name of the project", example: "My Awesome Project" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @ApiProperty({
    description: "A brief description of the project",
    required: false,
    example: "This project manages the core features of our new application.",
  })
  @IsString()
  @IsOptional()
  description?: string
}

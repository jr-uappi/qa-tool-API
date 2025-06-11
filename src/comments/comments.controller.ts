import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common"
import type { CommentsService } from "./comments.service"
import type { CreateCommentDto } from "../dto/create-comment.dto"
import type { UpdateCommentDto } from "../dto/update-comment.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { RolesGuard } from "../auth/roles.guard"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("comments")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentsService.create(createCommentDto, req.user)
  }

  @Get("by-entity/:entityType/:entityId")
  async findAllForEntity(
    @Param("entityType") entityType: "test_case" | "test_run",
    @Param("entityId") entityId: string,
  ) {
    return this.commentsService.findAllForEntity(entityType, entityId)
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.commentsService.findOne(id)
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto)
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.commentsService.remove(id)
    return { message: "Comment deleted successfully" }
  }
}

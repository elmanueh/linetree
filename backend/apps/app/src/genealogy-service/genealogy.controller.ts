import { CreateRelatedNodeDto, CreateTreeDto } from '@app/contracts';
import { GenealogyService } from '@app/gateway/genealogy-service/genealogy.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UUID } from 'crypto';

@Controller('trees')
export class GenealogyController {
  constructor(private readonly genealogyService: GenealogyService) {}

  // -------------------- TREES --------------------
  @Post()
  createTree(@Body() dto: CreateTreeDto) {
    return this.genealogyService.createTree(dto);
  }

  @Get(':id')
  getTree(@Param('id') id: UUID) {
    return this.genealogyService.getTree(id);
  }

  @Get()
  getTrees() {
    return this.genealogyService.getTrees();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTree(@Param('id') id: UUID) {
    return this.genealogyService.deleteTree(id);
  }

  // -------------------- NODES --------------------
  @Post(':id/nodes')
  createNode(@Param('id') treeId: UUID, @Body() dto: CreateRelatedNodeDto) {
    return this.genealogyService.createNode(treeId, dto);
  }

  @Get(':id/nodes/:id2')
  getNode(@Param('id') treeId: UUID, @Param('id2') nodeId: UUID) {
    return this.genealogyService.getNode(treeId, nodeId);
  }

  @Get(':id/nodes')
  getNodes(@Param('id') treeId: UUID) {
    return this.genealogyService.getNodes(treeId);
  }

  @Delete(':id/nodes/:id2')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteNode(@Param('id') treeId: UUID, @Param('id2') nodeId: UUID) {
    return this.genealogyService.deleteNode(treeId, nodeId);
  }
}

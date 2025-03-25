import { CreateNodeDto } from '@genealogy/contracts';
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
import { NodesService } from './nodes.service';

@Controller('trees/:tree/nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  createNode(
    @Param('tree') treeId: UUID,
    @Body() createNodeDto: CreateNodeDto,
  ) {
    return this.nodesService.createNode(treeId, createNodeDto);
  }
  @Get(':id')
  getNode(@Param('tree') treeId: UUID, @Param('id') id: UUID) {
    return this.nodesService.getNode(treeId, id);
  }

  @Get()
  getNodes(@Param('tree') treeId: UUID) {
    return this.nodesService.getNodes(treeId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteNode(@Param('tree') treeId: UUID, @Param('id') id: UUID) {
    return this.nodesService.deleteNode(treeId, id);
  }
}

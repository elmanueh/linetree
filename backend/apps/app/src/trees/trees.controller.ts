import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { TreesService } from './trees.service';

@Controller('api/trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Post()
  createTree(@Body() body: any) {
    return this.treesService.create(body);
  }

  @Get()
  findAllTrees() {
    return this.treesService.findAll();
  }

  @Get(':id')
  findOneTree(@Param('id') id: string) {
    return this.treesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treesService.remove(id);
  }

  // NODES

  @Post(':id/nodes')
  createNode(@Param('id') id: string) {
    return this.treesService.createNode(id);
  }

  @Get(':id/nodes')
  findAllNodes(@Param('id') id: string) {
    return this.treesService.findAllNodes(id);
  }

  @Get(':id/nodes/:id2')
  findOneNode(@Param('id') id: string, @Param('id2') id2: string) {
    return this.treesService.findOneNode(id, id2);
  }

  @Delete(':id/nodes/:id2')
  findNode(@Param('id') id: string, @Param('id2') id2: string) {
    return this.treesService.removeNode(id, id2);
  }
}

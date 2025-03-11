import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TreesService } from './trees.service';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Post()
  createTree(@Body() body: any) {
    return this.treesService.createTree(body);
  }

  @Get(':id')
  getTree(@Param('id') id: string) {
    return this.treesService.getTree(id);
  }

  @Get()
  getTrees() {
    return this.treesService.getTrees();
  }

  @Delete(':id')
  deleteTree(@Param('id') id: string) {
    return this.treesService.deleteTree(id);
  }
}

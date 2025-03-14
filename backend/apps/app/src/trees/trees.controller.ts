import { CreateTreeDto } from '@app/contracts/trees/create-tree.dto';
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
import { TreesService } from './trees.service';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Post()
  createTree(@Body() createTreeDto: CreateTreeDto) {
    return this.treesService.createTree(createTreeDto);
  }

  @Get(':id')
  getTree(@Param('id') id: UUID) {
    return this.treesService.getTree(id);
  }

  @Get()
  getTrees() {
    return this.treesService.getTrees();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTree(@Param('id') id: UUID) {
    return this.treesService.deleteTree(id);
  }
}

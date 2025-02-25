import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { GetTreeDto } from './dto/get-tree.dto';
import { GetTreesDto } from './dto/get-trees.dto';
import { TreeMapper } from './mapper/tree.mapper';
import { TreesService } from './trees.service';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Post()
  create(@Body(new ValidationPipe()) createTreeDto: CreateTreeDto) {
    return this.treesService.create(TreeMapper.toDomain(createTreeDto));
  }

  @Get()
  async findAll(): Promise<GetTreesDto> {
    return TreeMapper.toGetAllDto(await this.treesService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetTreeDto> {
    return TreeMapper.toGetDto(await this.treesService.findOne(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treesService.remove(id);
  }
}

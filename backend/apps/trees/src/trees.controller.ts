import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTreeDto } from './dto/create-tree.dto';
import { GetTreeDto } from './dto/get-tree.dto';
import { GetTreesDto } from './dto/get-trees.dto';
import { TreeMapper } from './mapper/tree.mapper';
import { TreesService } from './trees.service';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @MessagePattern('trees.create')
  async createTree(
    @Payload(new ValidationPipe()) createTreeDto: CreateTreeDto,
  ): Promise<string> {
    return await this.treesService.createTree(createTreeDto.name);
  }

  @MessagePattern('trees.findOne')
  async findOneTree(@Payload('id') id: string): Promise<GetTreeDto> {
    const tree = await this.treesService.findOneTree(id);
    return TreeMapper.toGetDto(tree);
  }

  @MessagePattern('trees.findAll')
  async findAllTrees(): Promise<GetTreesDto> {
    const trees = await this.treesService.findAllTrees();
    return TreeMapper.toGetAllDto(trees);
  }

  @MessagePattern('trees.remove')
  async removeTree(@Payload('id') id: string) {
    return await this.treesService.removeTree(id);
  }
}

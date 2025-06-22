import { CreateTreeDto, TREES_PATTERNS } from '@app/contracts';
import { TreeDomainMapper } from '@genealogy-ms/core/mapper/tree.mapper';
import { TreesService } from '@genealogy-ms/trees/trees.service';
import { Controller, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @MessagePattern(TREES_PATTERNS.CREATE)
  async createTree(@Payload(ValidationPipe) dto: CreateTreeDto) {
    const tree = await this.treesService.create(dto.name);
    return tree.id;
  }

  @MessagePattern(TREES_PATTERNS.FIND_ONE)
  async findOneTree(@Payload('id', ParseUUIDPipe) treeId: UUID) {
    const tree = await this.treesService.findOneById(treeId);
    return TreeDomainMapper.domain2GetDto(tree);
  }

  @MessagePattern(TREES_PATTERNS.FIND_ALL)
  async findAllTrees() {
    const trees = await this.treesService.findAll();
    return TreeDomainMapper.domain2GetAllDto(trees);
  }

  @MessagePattern(TREES_PATTERNS.REMOVE)
  async removeTree(@Payload('id', ParseUUIDPipe) treeId: UUID) {
    await this.treesService.delete(treeId);
    return {};
  }

  @MessagePattern(TREES_PATTERNS.GENEALOGY)
  async genealogy(@Payload('id', ParseUUIDPipe) treeId: UUID) {
    const genealogy = await this.treesService.getGenealogy(treeId);
    return genealogy;
  }
}

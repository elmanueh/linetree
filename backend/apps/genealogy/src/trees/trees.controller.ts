import { CreateTreeDto, TREES_PATTERNS } from '@app/contracts';
import { RpcParseUUIDPipe, RpcValidationPipe } from '@app/shared';
import { TreeDomainMapper } from '@genealogy-ms/core/mapper/tree.mapper';
import { TreesService } from '@genealogy-ms/trees/trees.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @MessagePattern(TREES_PATTERNS.CREATE)
  async createTree(@Payload(RpcValidationPipe) dto: CreateTreeDto) {
    return await this.treesService.createTree(dto.name);
  }

  @MessagePattern(TREES_PATTERNS.FIND_ONE)
  async findOneTree(@Payload('id', RpcParseUUIDPipe) treeId: UUID) {
    const tree = await this.treesService.findOneTree(treeId);
    return TreeDomainMapper.domain2GetDto(tree);
  }

  @MessagePattern(TREES_PATTERNS.FIND_ALL)
  async findAllTrees() {
    const trees = await this.treesService.findAllTrees();
    return TreeDomainMapper.domain2GetAllDto(trees);
  }

  @MessagePattern(TREES_PATTERNS.REMOVE)
  async removeTree(@Payload('id', RpcParseUUIDPipe) treeId: UUID) {
    await this.treesService.removeTree(treeId);
    return {};
  }

  @MessagePattern(TREES_PATTERNS.GENEALOGY)
  async genealogy(@Payload('id', RpcParseUUIDPipe) treeId: UUID) {
    const genealogy = await this.treesService.getGenealogy(treeId);
    return genealogy;
  }
}

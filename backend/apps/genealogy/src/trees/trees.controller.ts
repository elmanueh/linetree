import { CreateTreeDto, TREES_PATTERNS } from '@app/contracts';
import { TreeDomainMapper } from '@app/genealogy/core/mapper/tree.mapper';
import { TreesService } from '@app/genealogy/trees/trees.service';
import { RpcParseUUIDPipe, RpcValidationPipe } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @MessagePattern(TREES_PATTERNS.CREATE)
  async createTree(
    @Payload(new RpcValidationPipe()) createTreeDto: CreateTreeDto,
  ) {
    return await this.treesService.createTree(createTreeDto.name);
  }

  @MessagePattern(TREES_PATTERNS.FIND_ONE)
  async findOneTree(@Payload('id', RpcParseUUIDPipe) id: UUID) {
    const tree = await this.treesService.findOneTree(id);
    return TreeDomainMapper.domain2GetDto(tree);
  }

  @MessagePattern(TREES_PATTERNS.FIND_ALL)
  async findAllTrees() {
    const trees = await this.treesService.findAllTrees();
    return TreeDomainMapper.domain2GetAllDto(trees);
  }

  @MessagePattern(TREES_PATTERNS.REMOVE)
  async removeTree(@Payload('id', RpcParseUUIDPipe) id: UUID) {
    await this.treesService.removeTree(id);
    return {};
  }
}

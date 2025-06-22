import { TREES_PATTERNS } from '@app/contracts';
import { TreeDomainMapper } from '@genealogy-ms/core/mapper/tree.mapper';
import { CreateTreePayload } from '@genealogy-ms/trees/dto/create-tree.payload';
import { DeleteTreePayload } from '@genealogy-ms/trees/dto/delete-tree.payload';
import { GetGenealogyPayload } from '@genealogy-ms/trees/dto/get-genealogy.payload';
import { GetTreePayload } from '@genealogy-ms/trees/dto/get-tree.payload';
import { GetTreesPayload } from '@genealogy-ms/trees/dto/get-trees.payload';
import { TreesService } from '@genealogy-ms/trees/trees.service';
import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @MessagePattern(TREES_PATTERNS.CREATE)
  async createTree(@Payload(ValidationPipe) payload: CreateTreePayload) {
    const { name, owner } = payload;

    const tree = await this.treesService.create(name, owner);
    return tree.id;
  }

  @MessagePattern(TREES_PATTERNS.FIND_ONE)
  async findOneTree(@Payload(ValidationPipe) payload: GetTreePayload) {
    const { treeId, owner } = payload;

    const tree = await this.treesService.findOneById(treeId, owner);
    return TreeDomainMapper.domain2GetDto(tree);
  }

  @MessagePattern(TREES_PATTERNS.FIND_ALL)
  async findAllTrees(@Payload(ValidationPipe) payload: GetTreesPayload) {
    const { owner } = payload;

    const trees = await this.treesService.findAll(owner);
    return TreeDomainMapper.domain2GetAllDto(trees);
  }

  @MessagePattern(TREES_PATTERNS.REMOVE)
  async removeTree(@Payload(ValidationPipe) payload: DeleteTreePayload) {
    const { treeId, owner } = payload;

    await this.treesService.delete(treeId, owner);
    return {};
  }

  @MessagePattern(TREES_PATTERNS.GENEALOGY)
  async genealogy(@Payload(ValidationPipe) payload: GetGenealogyPayload) {
    const { treeId, owner } = payload;

    const genealogy = await this.treesService.getGenealogy(treeId, owner);
    return genealogy;
  }
}

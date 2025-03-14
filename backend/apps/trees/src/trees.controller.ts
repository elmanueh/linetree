import { CreateTreeDto } from '@app/contracts/trees/create-tree.dto';
import { TREES_PATTERNS } from '@app/contracts/trees/trees.patterns';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { TreeMapper } from './mapper/tree.mapper';
import { RpcParseUUIDPipe } from './pipes/rpc-uuid.pipe';
import { RpcValidationPipe } from './pipes/rpc-validation.pipe';
import { TreesService } from './trees.service';

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
    return TreeMapper.toGetDto(tree);
  }

  @MessagePattern(TREES_PATTERNS.FIND_ALL)
  async findAllTrees() {
    const trees = await this.treesService.findAllTrees();
    return TreeMapper.toGetAllDto(trees);
  }

  @MessagePattern(TREES_PATTERNS.REMOVE)
  async removeTree(@Payload('id', RpcParseUUIDPipe) id: UUID) {
    await this.treesService.removeTree(id);
    return {};
  }
}

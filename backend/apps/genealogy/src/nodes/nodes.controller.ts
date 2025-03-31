import { CreateNodeDto, NODES_PATTERNS } from '@genealogy/contracts';
import { NodeDomainMapper } from '@genealogy/core/mapper/node.mapper';
import { NodesService } from '@genealogy/nodes/nodes.service';
import { RpcParseUUIDPipe, RpcValidationPipe } from '@genealogy/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller()
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @MessagePattern(NODES_PATTERNS.CREATE)
  async createNode(
    @Payload(RpcValidationPipe)
    { treeId, dto }: { treeId: UUID; dto: CreateNodeDto },
  ) {
    console.log('createNode', treeId, dto);
    return await this.nodesService.createNode(treeId, dto.name);
  }

  @MessagePattern(NODES_PATTERNS.FIND_ONE)
  async findOneNode(
    @Payload(RpcParseUUIDPipe)
    { treeId, nodeId }: { treeId: UUID; nodeId: UUID },
  ) {
    const node = await this.nodesService.findOneNode(treeId, nodeId);
    return NodeDomainMapper.domain2GetDto(node);
  }

  @MessagePattern(NODES_PATTERNS.FIND_ALL)
  async findAllNodes(@Payload(RpcParseUUIDPipe) treeId: UUID) {
    const nodes = await this.nodesService.findAllNodes(treeId);
    return NodeDomainMapper.domain2GetAllDto(nodes);
  }

  @MessagePattern(NODES_PATTERNS.REMOVE)
  async removeNode(
    @Payload(RpcParseUUIDPipe)
    { treeId, nodeId }: { treeId: UUID; nodeId: UUID },
  ) {
    await this.nodesService.removeNode(treeId, nodeId);
    return {};
  }
}

import { NODES_PATTERNS } from '@app/contracts';
import { RpcParseUUIDPipe, RpcValidationPipe } from '@app/shared';
import { NodeDomainMapper } from '@genealogy-ms/core/mapper/node.mapper';
import { CreateNodePayload } from '@genealogy-ms/nodes/dto/create-node.payload';
import { GetNodePayload } from '@genealogy-ms/nodes/dto/get-node.payload';
import { RemoveNodePayload } from '@genealogy-ms/nodes/dto/remove-node.payload';
import { UpdateNodePayload } from '@genealogy-ms/nodes/dto/update-node.payload';
import { NodesService } from '@genealogy-ms/nodes/nodes.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller()
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @MessagePattern(NODES_PATTERNS.CREATE)
  async createNode(@Payload(RpcValidationPipe) payload: CreateNodePayload) {
    return await this.nodesService.createNode(
      payload.treeId,
      payload.nodeRefId,
      payload.spouseId,
      payload.type,
      payload.dto,
    );
  }

  @MessagePattern(NODES_PATTERNS.FIND_ONE)
  async findOneNode(@Payload(RpcValidationPipe) payload: GetNodePayload) {
    const node = await this.nodesService.findOneNode(
      payload.treeId,
      payload.nodeId,
    );
    return NodeDomainMapper.domain2GetDto(node);
  }

  @MessagePattern(NODES_PATTERNS.FIND_ALL)
  async findAllNodes(@Payload('treeId', RpcParseUUIDPipe) treeId: UUID) {
    const nodes = await this.nodesService.findAllNodes(treeId);
    return NodeDomainMapper.domain2GetAllDto(nodes);
  }

  @MessagePattern(NODES_PATTERNS.REMOVE)
  async removeNode(@Payload(RpcValidationPipe) payload: RemoveNodePayload) {
    await this.nodesService.removeNode(payload.treeId, payload.nodeId);
    return {};
  }

  @MessagePattern(NODES_PATTERNS.UPDATE)
  async updateNode(@Payload(RpcValidationPipe) payload: UpdateNodePayload) {
    await this.nodesService.updateNode(
      payload.treeId,
      payload.nodeId,
      payload.dto,
    );
    return {};
  }
}

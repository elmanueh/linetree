import { NODES_PATTERNS } from '@app/contracts';
import { NodeDomainMapper } from '@genealogy-ms/core/mapper/node.mapper';
import { CreateNodePayload } from '@genealogy-ms/nodes/dto/create-node.payload';
import { GetNodePayload } from '@genealogy-ms/nodes/dto/get-node.payload';
import { RemoveNodePayload } from '@genealogy-ms/nodes/dto/remove-node.payload';
import { UpdateNodePayload } from '@genealogy-ms/nodes/dto/update-node.payload';
import { NodesService } from '@genealogy-ms/nodes/nodes.service';
import { Controller, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller()
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @MessagePattern(NODES_PATTERNS.CREATE)
  async createNode(@Payload(ValidationPipe) payload: CreateNodePayload) {
    const node = await this.nodesService.create(
      payload.treeId,
      payload.nodeRefId,
      payload.spouseId,
      payload.type,
      payload.dto,
    );

    return node.id;
  }

  @MessagePattern(NODES_PATTERNS.FIND_ONE)
  async findOneNode(@Payload(ValidationPipe) payload: GetNodePayload) {
    const node = await this.nodesService.findOneById(
      payload.treeId,
      payload.nodeId,
    );
    return NodeDomainMapper.domain2GetDto(node);
  }

  @MessagePattern(NODES_PATTERNS.FIND_ALL)
  async findAllNodes(@Payload('treeId', ParseUUIDPipe) treeId: UUID) {
    const nodes = await this.nodesService.findAll(treeId);
    return NodeDomainMapper.domain2GetAllDto(nodes);
  }

  @MessagePattern(NODES_PATTERNS.REMOVE)
  async removeNode(@Payload(ValidationPipe) payload: RemoveNodePayload) {
    await this.nodesService.delete(payload.treeId, payload.nodeId);
    return {};
  }

  @MessagePattern(NODES_PATTERNS.UPDATE)
  async updateNode(@Payload(ValidationPipe) payload: UpdateNodePayload) {
    await this.nodesService.updateNode(
      payload.treeId,
      payload.nodeId,
      payload.dto,
    );
    return {};
  }
}

import { NODES_PATTERNS } from '@app/contracts';
import { NodeDomainMapper } from '@app/genealogy/core/mapper/node.mapper';
import { CreateNodePayload } from '@app/genealogy/nodes/dto/create-node.payload';
import { GetNodePayload } from '@app/genealogy/nodes/dto/get-node.payload';
import { RemoveNodePayload } from '@app/genealogy/nodes/dto/remove-node.payload';
import { UpdateNodePayload } from '@app/genealogy/nodes/dto/update-node.payload';
import { NodesService } from '@app/genealogy/nodes/nodes.service';
import { RpcParseUUIDPipe, RpcValidationPipe } from '@app/shared';
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
      payload.type,
      payload.dto.name,
      payload.dto.firstName,
      payload.dto.lastName || '',
      payload.dto.gender,
      new Date(payload.dto.birthDate),
      payload.dto.deathDate ? new Date(payload.dto.deathDate) : undefined,
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
      payload.dto.name,
    );
    return {};
  }
}

import { NODES_PATTERNS } from '@app/contracts';
import { NodeDomainMapper } from '@genealogy-ms/core/mapper/node.mapper';
import { CreateNodePayload } from '@genealogy-ms/nodes/dto/create-node.payload';
import { DeleteNodePayload } from '@genealogy-ms/nodes/dto/delete-node.payload';
import { GetNodePayload } from '@genealogy-ms/nodes/dto/get-node.payload';
import { GetNodesPayload } from '@genealogy-ms/nodes/dto/get-nodes.payload';
import { UpdateNodePayload } from '@genealogy-ms/nodes/dto/update-node.payload';
import { NodesService } from '@genealogy-ms/nodes/nodes.service';
import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @MessagePattern(NODES_PATTERNS.CREATE)
  async createNode(@Payload(ValidationPipe) payload: CreateNodePayload) {
    const { treeId, dto, nodeRefId, type, spouseId, owner } = payload;

    const node = await this.nodesService.create(
      treeId,
      nodeRefId,
      spouseId,
      type,
      dto,
      owner,
    );

    return node.id;
  }

  @MessagePattern(NODES_PATTERNS.FIND_ONE)
  async findOneNode(@Payload(ValidationPipe) payload: GetNodePayload) {
    const { treeId, nodeId, owner } = payload;

    const node = await this.nodesService.findOneById(treeId, nodeId, owner);
    return NodeDomainMapper.domain2GetDto(node);
  }

  @MessagePattern(NODES_PATTERNS.FIND_ALL)
  async findAllNodes(@Payload(ValidationPipe) payload: GetNodesPayload) {
    const { treeId, owner } = payload;

    const nodes = await this.nodesService.findAll(treeId, owner);
    return NodeDomainMapper.domain2GetAllDto(nodes);
  }

  @MessagePattern(NODES_PATTERNS.REMOVE)
  async removeNode(@Payload(ValidationPipe) payload: DeleteNodePayload) {
    const { treeId, nodeId, owner } = payload;

    await this.nodesService.delete(treeId, nodeId, owner);
    return {};
  }

  @MessagePattern(NODES_PATTERNS.UPDATE)
  async updateNode(@Payload(ValidationPipe) payload: UpdateNodePayload) {
    const { treeId, nodeId, dto, owner } = payload;

    await this.nodesService.updateNode(treeId, nodeId, dto, owner);
    return {};
  }
}

import { CreateNodeDto, NODES_PATTERNS } from '@genealogy/contracts';
import { RpcParseUUIDPipe, RpcValidationPipe } from '@genealogy/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { NodeMapper } from '../mapper/node.mapper';
import { NodesService } from './nodes.service';

@Controller()
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @MessagePattern(NODES_PATTERNS.CREATE)
  async createNode(@Payload(RpcValidationPipe) createNodeDto: CreateNodeDto) {
    return await this.nodesService.createNode(createNodeDto.name);
  }

  @MessagePattern(NODES_PATTERNS.FIND_ONE)
  async findOneNode(@Payload(RpcParseUUIDPipe) id: UUID) {
    const node = await this.nodesService.findOneNode(id);
    return NodeMapper.toGetDto(node);
  }

  @MessagePattern(NODES_PATTERNS.FIND_ALL)
  async findAllNodes() {
    const nodes = await this.nodesService.findAllNodes();
    return NodeMapper.toGetAllDto(nodes);
  }

  @MessagePattern(NODES_PATTERNS.REMOVE)
  async removeNodes(@Payload(RpcParseUUIDPipe) id: UUID) {
    await this.nodesService.removeNode(id);
    return {};
  }
}

import { CreateNodeDto, UpdateNodeDto } from '@app/contracts';
import { EntityNotFoundException } from '@app/shared';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';
import { NodeDomainMapper } from '@genealogy-ms/core/mapper/node.mapper';
import { NodeRepository } from '@genealogy-ms/core/persistance/nodes.repository';
import { TreeRepository } from '@genealogy-ms/core/persistance/trees.repository';
import { RelationsService } from '@genealogy-ms/relations/relations.service';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class NodesService {
  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly treeRepository: TreeRepository,
    private readonly relationService: RelationsService,
  ) {}

  async create(
    treeId: UUID,
    nodeRefId: UUID,
    spouseId: UUID | undefined,
    type: RelationType,
    dto: CreateNodeDto,
    owner: UUID,
  ): Promise<NodeEntity> {
    if (!treeId) {
      throw new BadRequestException('The treeId cannot be null or undefined.');
    }
    if (!nodeRefId) {
      throw new BadRequestException(
        'The nodeRefId cannot be null or undefined.',
      );
    }
    if (!type) {
      throw new BadRequestException(
        'The relation type cannot be null or undefined.',
      );
    }
    if (!dto) {
      throw new BadRequestException(
        'The node data cannot be null or undefined.',
      );
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined.');
    }

    const tree = await this.treeRepository.findById(treeId);
    if (tree.owner !== owner) {
      throw new ForbiddenException(
        'You do not have permission to modify this tree.',
      );
    }

    if (type === RelationType.Parent) {
      const parents = await this.relationService.findParents(nodeRefId, treeId);

      if (parents.length >= 2) {
        throw new ConflictException(
          'A node can only have two parents. Please check the existing relations.',
        );
      }
    }

    const node = NodeDomainMapper.createDto2Domain(dto);
    tree.addNode(node);

    await this.nodeRepository.save(node);
    await this.treeRepository.save(tree);

    await this.relationService.createRelation(
      nodeRefId,
      node.id,
      spouseId,
      type,
      treeId,
    );

    return node;
  }

  async findOneById(
    treeId: UUID,
    nodeId: UUID,
    owner: UUID,
  ): Promise<NodeEntity> {
    if (!treeId) {
      throw new BadRequestException('The treeId cannot be null or undefined.');
    }
    if (!nodeId) {
      throw new BadRequestException('The nodeId cannot be null or undefined.');
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined.');
    }

    const tree = await this.treeRepository.findById(treeId);
    if (tree.owner !== owner) {
      throw new ForbiddenException(
        'You do not have permission to access this node.',
      );
    }

    const node = tree.getNode(nodeId);
    if (!node) {
      throw new EntityNotFoundException("The node couldn't be found");
    }
    return node;
  }

  async findAll(treeId: UUID, owner: UUID): Promise<NodeEntity[]> {
    if (!treeId) {
      throw new BadRequestException('The treeId cannot be null or undefined.');
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined.');
    }

    const tree = await this.treeRepository.findById(treeId);
    if (tree.owner !== owner) {
      throw new ForbiddenException(
        'You do not have permission to access this tree.',
      );
    }

    const nodes = tree.getNodes();
    return nodes;
  }

  async delete(treeId: UUID, nodeId: UUID, owner: UUID): Promise<void> {
    if (!treeId) {
      throw new BadRequestException('The treeId cannot be null or undefined.');
    }
    if (!nodeId) {
      throw new BadRequestException('The nodeId cannot be null or undefined.');
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined.');
    }

    const tree = await this.treeRepository.findById(treeId);
    if (tree.owner !== owner) {
      throw new ForbiddenException(
        'You do not have permission to delete this node.',
      );
    }

    if (tree.getNodes().length === 1) {
      throw new ConflictException(
        'The last node in the tree cannot be deleted. Please delete the tree instead.',
      );
    }

    const relations = await this.relationService.findRelationsByNodeId(
      nodeId,
      treeId,
    );

    for (const relation of relations) {
      const descendant = relation.targetNodeId;
      tree.removeNode(descendant);
      await this.nodeRepository.delete(descendant);
      await this.relationService.removeRelation(descendant);
    }

    tree.removeNode(nodeId);
    await this.nodeRepository.delete(nodeId);
    await this.treeRepository.save(tree);
    await this.relationService.removeRelation(nodeId);
  }

  async updateNode(
    treeId: UUID,
    nodeId: UUID,
    dto: UpdateNodeDto,
    owner: UUID,
  ): Promise<void> {
    if (!treeId) {
      throw new BadRequestException('The treeId cannot be null or undefined.');
    }
    if (!nodeId) {
      throw new BadRequestException('The nodeId cannot be null or undefined.');
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined.');
    }

    const tree = await this.treeRepository.findById(treeId);
    if (tree.owner !== owner) {
      throw new ForbiddenException(
        'You do not have permission to update this node.',
      );
    }

    const node = tree.getNode(nodeId);
    if (!node) {
      throw new EntityNotFoundException("The node couldn't be found");
    }

    if (dto.address) node.address = dto.address;
    if (dto.birthDate) node.birthDate = dto.birthDate;
    if (dto.birthPlace) node.birthPlace = dto.birthPlace;
    if (dto.deathDate) node.deathDate = dto.deathDate;
    if (dto.deathPlace) node.deathPlace = dto.deathPlace;
    if (dto.email) node.email = dto.email;
    if (dto.familyName) node.familyName = dto.familyName;
    if (dto.gender) node.gender = dto.gender;
    if (dto.givenName) node.givenName = dto.givenName;
    if (dto.nationality) node.nationality = dto.nationality;
    if (dto.telephone) node.telephone = dto.telephone;

    await this.nodeRepository.save(node);
  }
}

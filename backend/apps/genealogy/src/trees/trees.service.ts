import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { TreeEntity } from '@genealogy-ms/core/domain/tree.entity';
import { NodeRepository } from '@genealogy-ms/core/persistance/nodes.repository';
import { RelationsRepository } from '@genealogy-ms/core/persistance/relations.repository';
import { TreeRepository } from '@genealogy-ms/core/persistance/trees.repository';
import { RelationsService } from '@genealogy-ms/relations/relations.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { JsonLdDocument } from 'jsonld';

@Injectable()
export class TreesService {
  constructor(
    private readonly treeRepository: TreeRepository,
    private readonly nodeRepository: NodeRepository,
    private readonly relationRepository: RelationsRepository,
    private readonly relationsService: RelationsService,
  ) {}

  async create(name: string, owner: UUID): Promise<TreeEntity> {
    if (!name) {
      throw new BadRequestException('The name cannot be null or undefined');
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined');
    }

    // TODO: change for user data
    const node = NodeEntity.create({
      givenName: 'test1',
      familyName: 'test2',
      birthDate: new Date(),
      email: '',
      nationality: '',
      telephone: '',
      gender: GenderType.Male,
    });
    const tree = TreeEntity.create({ name, nodes: [node], owner });

    await this.treeRepository.save(tree);
    await this.nodeRepository.save(node);
    return tree;
  }

  async findOneById(treeId: UUID, owner: UUID): Promise<TreeEntity> {
    if (!treeId) {
      throw new BadRequestException('The id cannot be null or undefined');
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined');
    }

    const tree = await this.treeRepository.findById(treeId);
    if (tree.owner !== owner) {
      throw new ForbiddenException(
        'You do not have permission to access this tree',
      );
    }
    return tree;
  }

  async findAll(owner: UUID): Promise<TreeEntity[]> {
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined');
    }

    const trees = await this.treeRepository.findAllByOwner(owner);
    return trees;
  }

  async delete(treeId: UUID, owner: UUID): Promise<void> {
    if (!treeId) {
      throw new BadRequestException('The id cannot be null or undefined');
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined');
    }

    const tree = await this.treeRepository.findById(treeId);
    if (tree.owner !== owner) {
      throw new ForbiddenException(
        'You do not have permission to delete this tree',
      );
    }

    await this.treeRepository.delete(treeId);

    const nodes = tree.getNodes();
    await Promise.all(nodes.map((node) => this.nodeRepository.delete(node.id)));

    await this.relationRepository.deleteByTreeId(treeId);
  }

  async getGenealogy(treeId: UUID, owner: UUID): Promise<JsonLdDocument> {
    if (!treeId) {
      throw new BadRequestException('The id cannot be null or undefined');
    }
    if (!owner) {
      throw new BadRequestException('The owner cannot be null or undefined');
    }

    const tree = await this.treeRepository.findById(treeId);
    if (tree.owner !== owner) {
      throw new ForbiddenException(
        'You do not have permission to access this tree',
      );
    }

    const genealogy = await this.relationsService.getGenealogy(tree);
    return genealogy;
  }
}

import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { TreeEntity } from '@genealogy-ms/core/domain/tree.entity';
import { NodeRepository } from '@genealogy-ms/core/persistance/nodes.repository';
import { RelationsRepository } from '@genealogy-ms/core/persistance/relations.repository';
import { TreeRepository } from '@genealogy-ms/core/persistance/trees.repository';
import { RelationsService } from '@genealogy-ms/relations/relations.service';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(name: string): Promise<TreeEntity> {
    if (!name) {
      throw new BadRequestException('The name cannot be null or undefined');
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
    const tree = TreeEntity.create({ name, nodes: [node] });

    await this.treeRepository.save(tree);
    await this.nodeRepository.save(node);
    return tree;
  }

  async findOneById(treeId: UUID): Promise<TreeEntity> {
    if (!treeId) {
      throw new BadRequestException('The id cannot be null or undefined');
    }

    const tree = await this.treeRepository.findById(treeId);
    return tree;
  }

  async findAll(): Promise<TreeEntity[]> {
    const trees = await this.treeRepository.findAll();
    return trees;
  }

  async delete(treeId: UUID): Promise<void> {
    if (!treeId) {
      throw new BadRequestException('The id cannot be null or undefined');
    }

    const tree = await this.treeRepository.findById(treeId);
    await this.treeRepository.delete(treeId);

    const nodes = tree.getNodes();
    await Promise.all(nodes.map((node) => this.nodeRepository.delete(node.id)));

    await this.relationRepository.deleteByTreeId(treeId);
  }

  async getGenealogy(treeId: UUID): Promise<JsonLdDocument> {
    if (!treeId) {
      throw new BadRequestException('The id cannot be null or undefined');
    }

    const tree = await this.treeRepository.findById(treeId);
    const genealogy = await this.relationsService.getGenealogy(tree);

    return genealogy;
  }
}

import { CreateTreeDto, GetTreeDto, GetTreesDto } from '@genealogy/contracts';
import { TreeEntity } from '@genealogy/core/domain/tree.entity';

export class TreeDomainMapper {
  static createDto2Domain(dto: CreateTreeDto): TreeEntity {
    const tree = TreeEntity.create({ name: dto.name, nodes: [] });

    return tree;
  }

  static domain2GetDto(tree: TreeEntity): GetTreeDto {
    const dto = new GetTreeDto();
    dto.id = tree.id;
    dto.name = tree.name;
    dto.nodes = tree.nodes.map((node) => node.id);

    return dto;
  }

  static domain2GetAllDto(trees: TreeEntity[]): GetTreesDto {
    const dto = new GetTreesDto();
    dto.trees.push(...trees.map((tree) => this.domain2GetDto(tree)));

    return dto;
  }
}

type GetTreeDto = {
  id: string;
  name: string;
};

export class GetTreesDto {
  trees: GetTreeDto[];

  constructor() {
    this.trees = [];
  }
}

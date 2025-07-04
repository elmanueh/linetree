import { randomUUID, UUID } from 'crypto';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UUID;
  protected props: T;

  constructor(props: T, id?: UUID) {
    this._id = id ? id : randomUUID();
    this.props = props;
  }

  get id(): UUID {
    return this._id;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}

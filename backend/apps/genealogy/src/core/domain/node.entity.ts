import { Gender } from '@app/genealogy/core/domain/gender.enum';
import { Entity } from '@app/shared';
import { UUID } from 'crypto';

export interface NodeProps {
  name: string;
  firstName: string;
  lastName?: string;
  birthDate: Date;
  deathDate?: Date;
  gender: Gender;
}

export class NodeEntity extends Entity<NodeProps> {
  private constructor(props: NodeProps, id?: UUID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  get lastName(): string {
    return this.props.lastName || '';
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }

  set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate;
  }

  get deathDate(): Date | null {
    return this.props.deathDate || null;
  }

  set deathDate(deathDate: Date) {
    this.props.deathDate = deathDate;
  }

  get gender(): Gender {
    return this.props.gender;
  }

  set gender(gender: Gender) {
    this.props.gender = gender;
  }

  static create(props: NodeProps, id?: UUID): NodeEntity {
    return new NodeEntity(props, id);
  }
}

import { Entity } from '@app/shared';
import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { UUID } from 'crypto';

export interface NodeProps {
  address?: string;
  birthDate?: Date;
  birthPlace?: string;
  deathDate?: Date;
  deathPlace?: string;
  email?: string;
  familyName?: string;
  gender: GenderType;
  givenName: string;
  nationality?: string;
  telephone?: string;
}

export class NodeEntity extends Entity<NodeProps> {
  private constructor(props: NodeProps, id?: UUID) {
    super(props, id);
  }

  get address(): string | undefined {
    return this.props.address;
  }

  set address(address: string | undefined) {
    this.props.address = address;
  }

  get birthDate(): Date | undefined {
    return this.props.birthDate;
  }

  set birthDate(birthDate: Date | undefined) {
    this.props.birthDate = birthDate;
  }

  get birthPlace(): string | undefined {
    return this.props.birthPlace;
  }

  set birthPlace(birthPlace: string | undefined) {
    this.props.birthPlace = birthPlace;
  }

  get deathDate(): Date | undefined {
    return this.props.deathDate;
  }

  set deathDate(deathDate: Date | undefined) {
    this.props.deathDate = deathDate;
  }

  get deathPlace(): string | undefined {
    return this.props.deathPlace;
  }

  set deathPlace(deathPlace: string | undefined) {
    this.props.deathPlace = deathPlace;
  }

  get email(): string | undefined {
    return this.props.email;
  }

  set email(email: string | undefined) {
    this.props.email = email;
  }

  get familyName(): string | undefined {
    return this.props.familyName;
  }

  set familyName(familyName: string | undefined) {
    this.props.familyName = familyName;
  }

  get gender(): GenderType {
    return this.props.gender;
  }

  set gender(gender: GenderType) {
    this.props.gender = gender;
  }

  get givenName(): string {
    return this.props.givenName;
  }

  set givenName(givenName: string) {
    this.props.givenName = givenName;
  }

  get nationality(): string | undefined {
    return this.props.nationality;
  }

  set nationality(nationality: string | undefined) {
    this.props.nationality = nationality;
  }

  get telephone(): string | undefined {
    return this.props.telephone;
  }

  set telephone(telephone: string | undefined) {
    this.props.telephone = telephone;
  }

  static create(props: NodeProps, id?: UUID): NodeEntity {
    return new NodeEntity(props, id);
  }
}

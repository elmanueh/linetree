import { GenderType } from '@app/genealogy/core/domain/gender.enum';
import { Entity } from '@app/shared';
import { UUID } from 'crypto';

export interface UserProps {
  birthDate: Date;
  email: string;
  firstName: string;
  gender: GenderType;
  lastName: string;
  password: string;
}

export class UserEntity extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UUID) {
    super(props, id);
  }

  static create(props: UserProps, id?: UUID): UserEntity {
    return new UserEntity(props, id);
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }

  get email(): string {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get gender(): GenderType {
    return this.props.gender;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): string {
    return this.props.password;
  }
}

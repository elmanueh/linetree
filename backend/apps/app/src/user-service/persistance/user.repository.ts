import { UserEntity } from '@app/gateway/user-service/entities/user.entity';
import { Repository } from '@app/shared';

export abstract class UserRepository extends Repository<UserEntity> {
  /**
   * Finds a user by their email address.
   * @param email The email address of the user to find.
   * @returns A promise that resolves to the UserEntity if found, or null if not found.
   */
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}

import { UserEntity } from "../entities/user_entity";

export interface UserRepository {
  getUser(): Promise<UserEntity>;
}

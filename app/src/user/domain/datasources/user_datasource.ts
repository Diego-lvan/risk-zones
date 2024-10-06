import { UserEntity } from "../entities/user_entity";

export interface UserDataSource {
  getUser(): Promise<UserEntity>;
}

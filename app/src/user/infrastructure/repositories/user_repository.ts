import { UserDataSource } from "../../domain/datasources/user_datasource";
import { UserEntity } from "../../domain/entities/user_entity";
import { UserRepository } from "../../domain/repositories/user_repository";

export class UserRepositoryImpl implements UserRepository {
  private userDataSource: UserDataSource;

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  async getUser(): Promise<UserEntity> {
    return await this.userDataSource.getUser();
  }
}

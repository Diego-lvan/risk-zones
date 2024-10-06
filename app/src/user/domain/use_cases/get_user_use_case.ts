import { UserDataSourceImpl } from "../../infrastructure/datasources/user_datasource";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user_repository";
import { UserRepository } from "./../repositories/user_repository";

export class GetUserUseCase {
  private userRepository: UserRepository;
  constructor() {
    const datasource = new UserDataSourceImpl();
    this.userRepository = new UserRepositoryImpl(datasource);
  }

  async execute() {
    return this.userRepository.getUser();
  }
}

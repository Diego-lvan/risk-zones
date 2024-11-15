import { ContactDataSourceImpl } from "../../infrastructure/datasources/contact_datasource";
import { ContactRepositoryImpl } from "../../infrastructure/repositories/contact_repository";
import { ContactRepository } from "../repositories/contact_repository";

export class GetContactsUseCase {
  private contactRepository: ContactRepository;

  constructor() {
    const contactDatasource = new ContactDataSourceImpl();
    this.contactRepository = new ContactRepositoryImpl(contactDatasource);
  }

  async execute() {
    return this.contactRepository.getContacts();
  }
}

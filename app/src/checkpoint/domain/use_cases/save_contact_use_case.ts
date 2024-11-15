import { ContactDataSourceImpl } from "../../infrastructure/datasources/contact_datasource";
import { ContactRepositoryImpl } from "../../infrastructure/repositories/contact_repository";
import { ContactEntity } from "../entities/contact_entity";
import { ContactRepository } from "../repositories/contact_repository";

export class SaveContactUseCase {
  private contactRepository: ContactRepository;

  constructor() {
    const contactDatasource = new ContactDataSourceImpl();
    this.contactRepository = new ContactRepositoryImpl(contactDatasource);
  }

  async execute(contact: ContactEntity) {
    try {
      await this.validate(contact);
      return this.contactRepository.saveContact(contact);
    } catch (error) {
      throw new Error("Error saving contact");
    }
  }

  async validate(contact: ContactEntity) {
    if (!contact.name || contact.name === "") {
      throw new Error("Name is required");
    }

    if (!contact.phone || contact.phone === "") {
      throw new Error("Phone is required");
    }

    if (!contact.id || contact.id === "") {
      throw new Error("Id is required");
    }
  }
}

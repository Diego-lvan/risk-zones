import { ContactDataSource } from "../../domain/datasources/contact_datasource";
import { ContactEntity } from "../../domain/entities/contact_entity";
import { ContactRepository } from "../../domain/repositories/contact_repository";

export class ContactRepositoryImpl implements ContactRepository {
  private contactDataSource: ContactDataSource;

  constructor(contactDataSource: ContactDataSource) {
    this.contactDataSource = contactDataSource;
  }

  async getContacts() {
    return this.contactDataSource.getContacts();
  }

  async saveContact(contact: ContactEntity) {
    return this.contactDataSource.saveContact(contact);
  }
}

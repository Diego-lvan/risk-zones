import { Database } from "@/src/common/database/database";
import { ContactDataSource } from "../../domain/datasources/contact_datasource";
import { ContactEntity } from "../../domain/entities/contact_entity";

export class ContactDataSourceImpl implements ContactDataSource {
  async getContacts() {
    try {
      return await Database.instance.getContacts();
    } catch (error) {
      throw error;
    }
  }

  async saveContact(contact: ContactEntity) {
    try {
      await Database.instance.saveContact(contact);
    } catch (error) {
      throw error;
    }
  }
}

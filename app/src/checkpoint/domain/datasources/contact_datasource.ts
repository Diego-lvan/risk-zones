import { ContactEntity } from "../entities/contact_entity";

export interface ContactDataSource {
  getContacts(): Promise<ContactEntity[]>;
  saveContact(contact: ContactEntity): Promise<void>;
}

import { ContactEntity } from "../entities/contact_entity";

export interface ContactRepository {
  getContacts(): Promise<ContactEntity[]>;
  saveContact(contact: ContactEntity): Promise<void>;
}

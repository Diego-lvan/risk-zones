import { DB_NAME } from "@/common/constants/database";
import { ContactEntity } from "@/src/checkpoint/domain/entities/contact_entity";
import * as SQLite from "expo-sqlite";
import { ApiError } from "../errors/api_error";

/**
 * clase Database
 * @class Database
 * @classdesc Nos permite interactuar con la base de datos SQLite
 */
export class Database {
  private static _instance: Database | null = null;

  private constructor() {}

  /**
   * Metodo para guardar un contacto en la base de datos
   * @param contact El contacto a guardar
   * @returns Promise<void>
   * @throws ApiError si falla al guardar el contacto
   */
  public saveContact = async (contact: ContactEntity) => {
    let db;
    try {
      db = await SQLite.openDatabaseAsync(DB_NAME);
      // Create table if not exists
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS contacts (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone TEXT UNIQUE NOT NULL);`
      );
      // Insert contact
      const result = await db.runAsync(
        "INSERT INTO contacts (id, name, phone) VALUES (?, ?, ?);",
        [contact.id, contact.name, contact.phone]
      );
      if (result.changes === 1) {
        return;
      } else {
        throw new Error("Failed to save contact");
      }
    } catch (error) {
      throw new ApiError("Failed to save contact", 500);
    } finally {
      if (db) {
        db.closeSync();
      }
    }
  };

  /**
   * Metodo para obtener los contactos de la base de datos
   * @returns Promise<ContactEntity[]>
   * @throws ApiError si falla al obtener los contactos
   */
  public getContacts = async () => {
    let db;
    try {
      db = await SQLite.openDatabaseAsync(DB_NAME);
      // Create table if not exists
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS contacts (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone TEXT UNIQUE NOT NULL);`
      );
      // Select contacts
      const result = await db.getAllAsync("SELECT * FROM contacts;");
      if (result) {
        return result.map((contact: any) => {
          return {
            id: contact.id,
            name: contact.name,
            phone: contact.phone,
          } as ContactEntity;
        });
      } else {
        throw new Error("Failed to get contacts");
      }
    } catch (error) {
      throw new ApiError("Failed to get contacts", 500);
    } finally {
      if (db) {
        db.closeSync();
      }
    }
  };

  /**
   * Metodo que simula un singleton para la clase Database
   * @returns Database instancia de la clase Database
   */
  public static get instance() {
    if (!Database._instance) {
      Database._instance = new Database();
    }
    return Database._instance;
  }
}

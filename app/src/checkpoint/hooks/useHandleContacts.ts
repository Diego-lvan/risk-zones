import { useEffect, useState } from "react";
import { ContactEntity } from "../domain/entities/contact_entity";
import { SaveContactUseCase } from "../domain/use_cases/save_contact_use_case";
import { GetContactsUseCase } from "../domain/use_cases/get_contacts_use_case";
import * as Contacts from "expo-contacts";
import * as Crypto from "expo-crypto";
import { ContactError } from "@/src/common/errors/contacts_error";
import { Alert } from "react-native";

/**
 * Hook que maneja la lógica de los contactos.
 */
export const useHandleContacts = () => {
  const [contacts, setContacts] = useState<ContactEntity[]>([]);
  const [saveContactUseCase] = useState(() => new SaveContactUseCase());
  const [getContactsUseCase] = useState(() => new GetContactsUseCase());

  /**
   * Obtiene los contactos guardados.
   */
  const getContacts = async () => {
    const contacts = await getContactsUseCase.execute();
    setContacts(contacts);
  };

  /**
   * Maneja la lógica para abrir el selector de contactos.
   * @returns {Promise<void>}
   */
  const openContactPicker = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access contacts was denied");
      return;
    }
    const contact = await Contacts.presentContactPickerAsync();
    try {
      if (
        contact &&
        contact.phoneNumbers &&
        contact.phoneNumbers.length > 0 &&
        contact.phoneNumbers[0].number
      ) {
        let phoneNumber = contact.phoneNumbers[0].number;
        phoneNumber = phoneNumber.split(" ").join("");
        phoneNumber = phoneNumber.split("-").join("");
        phoneNumber = phoneNumber.substring(phoneNumber.length - 10);

        if (phoneNumber.length !== 10) {
          throw new Error("Invalid phone number");
        }

        const name = contact.name;
        const id = await Crypto.randomUUID();
        const newContact: ContactEntity = {
          id,
          name,
          phone: phoneNumber,
        };
        console.info("newContact", newContact);
        await saveContactUseCase.execute(newContact);
        await getContacts();

        Alert.alert(
          "Contacto guardado",
          "El contacto se guardó correctamente.",
          [
            {
              text: "Aceptar",
            },
          ]
        );
      } else {
        throw new ContactError("Invalid contact", 1);
      }
    } catch (error) {
      if (error instanceof ContactError) {
        Alert.alert(
          "Error",
          "No se seleccionó un contacto válido, vuelva a intentarlo.",
          [
            {
              text: "Volver a intentar",
              onPress: () => openContactPicker(),
            },
            {
              text: "Cancelar",
              style: "cancel",
            },
          ]
        );
      } else {
        Alert.alert(
          "Error",
          "No se pudo guardar el contacto, intente más tarde.",
          [
            {
              text: "Intentar más tarde",
            },
          ]
        );
      }
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return { contacts, openContactPicker };
};

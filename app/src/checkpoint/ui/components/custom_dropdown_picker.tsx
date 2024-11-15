import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";
import { ContactEntity } from "../../domain/entities/contact_entity";
import { useState } from "react";

interface CustomDropdownPickerProps {
  items: ContactEntity[];
  onSelectionChange: (value: string) => void;
}

export const CustomDropdownPicker = ({
  items,
  onSelectionChange,
}: CustomDropdownPickerProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const onChangeValue = (value: string) => {
    onSelectionChange(value);
    setSelectedValue(value);
  };
  return (
    <View style={styles.mainContainer}>
      <Picker
        style={styles.pickerContainer}
        selectedValue={selectedValue}
        onValueChange={onChangeValue}
      >
        {items.map((item) => (
          <Picker.Item key={item.id} label={item.name} value={item.phone} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 50,
  },
  pickerContainer: {
    flex: 1,
  },
});

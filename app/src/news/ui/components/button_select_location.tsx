import { APP_THEME } from "@/common/theme/theme";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export const ButtonSelectLocation = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Seleccionar ubicación</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 5,
    width: "100%",
    borderRadius: 8,
    height: 50,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: APP_THEME.colors.primary,
    marginTop: 20,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    //fontFamily: "StrokeWeight",
  },
});
/**


box-sizing: border-box;


display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px;
gap: 8px;

position: absolute;
width: 344px;
height: 54px;
left: 38px;
top: 493px;

background: #2C2C2C;
border: 1px solid #2C2C2C;
border-radius: 8px;

 */

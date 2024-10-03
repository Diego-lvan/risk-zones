interface Theme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    text: string;
  };
}

export const APP_THEME: Theme = {
  colors: {
    primary: "black",
    secondary: "white",
    tertiary: "#6c757d",
    background: "white",
    text: "#343a40",
  },
};

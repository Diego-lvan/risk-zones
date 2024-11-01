import { Fragment } from "react";
import { LatLng, Polyline } from "react-native-maps";

interface Props {
  coordinates: LatLng[];
}

export const LightedStreet = ({coordinates }: Props) => {
  return (
    <Fragment>
      <Polyline
        coordinates={coordinates}
        strokeColor="rgba(255, 255, 0, 0.2)" // Color amarillo con baja opacidad para el resplandor exterior
        strokeWidth={10} // Ancho mayor para el resplandor exterior
      />
      <Polyline
        coordinates={coordinates}
        strokeColor="rgba(255, 255, 0, 0.5)" // Color amarillo con media opacidad para el resplandor intermedio
        strokeWidth={6} // Ancho intermedio para el resplandor intermedio
      />
      <Polyline
        coordinates={coordinates}
        strokeColor="yellow" // Color amarillo sólido para la línea principal
        strokeWidth={3} // Ancho menor para la línea principal
      />
    </Fragment>
  );
};

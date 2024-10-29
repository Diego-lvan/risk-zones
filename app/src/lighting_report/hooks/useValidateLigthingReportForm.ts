import { useSelectLocationTwoPoints } from "@/src/common/context/location_context";
import { useUser } from "@/src/user/context/user_context";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const lighting_report_schema = Yup.object().shape({
  date: Yup.date().required("La fecha es requerida"),
  userId: Yup.string().required("El usuario es requerido"),
  startCoords: Yup.mixed().required("Las coordenadas de inicio son requeridas"),
  endCoords: Yup.mixed().required("Las coordenadas de fin son requeridas"),
  latitude: Yup.number().required("La latitud es requerida"),
  longitude: Yup.number().required("La longitud es requerida"),
});

export interface LightingReportForm {
  endCoords: any;
  startCoords: any;
  userId: string;
  date: Date;
  latitude: number;
  longitude: number;
}

type LightingReportFormFields = keyof LightingReportForm;

interface UseValidateFormProps {
  onSubmitCallback: (values: LightingReportForm) => void;
}

export const useValidatedForm = ({
  onSubmitCallback,
}: UseValidateFormProps) => {
  const {
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<LightingReportForm>({
    resolver: yupResolver(lighting_report_schema),
    mode: "onChange",
  });

  const { user } = useUser();
  const { startCoords, endCoords } = useSelectLocationTwoPoints();

  const updateValue = (
    name: LightingReportFormFields,
    value: string | number | Date
  ) => {
    setValue(name, value);
    trigger(name);
  };

  const onSubmit = async () => {
    if (startCoords && endCoords) {
      updateValue("latitude", startCoords.latitude);
      updateValue("longitude", startCoords.longitude);
      updateValue("latitude", endCoords.latitude);
      updateValue("longitude", endCoords.longitude);
    }
    updateValue("userId", user?.id || "");
    console.log(user?.id);
    updateValue("date", new Date());

    await handleSubmit(
      async (data) => {
        await onSubmitCallback(data);
      },
      (error) => {
        console.log(error);
      }
    )();
  };

  return { updateValue, onSubmit, errors };
};

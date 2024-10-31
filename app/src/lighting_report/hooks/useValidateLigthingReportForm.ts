import { useSelectLocationTwoPoints } from "@/src/common/context/location_two_points_context";
import { useUser } from "@/src/user/context/user_context";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const lighting_report_schema = Yup.object().shape({
  created_at: Yup.date().required("La fecha es requerida"),
  userId: Yup.string().required("El usuario es requerido"),
  startLatitude: Yup.number()
    .required("Start Latitude is required")
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude"),
  startLongitude: Yup.number()
    .required("Start Longitude is required")
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude"),
  endLatitude: Yup.number()
    .required("End Latitude is required")
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude"),
  endLongitude: Yup.number()
    .required("End Longitude is required")
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude"),
});

export interface LightingReportForm {
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;
  userId: string;
  created_at: Date;
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
  console.log("Start Coords:", startCoords);
  console.log("End Coords:", endCoords);
  const updateValue = (
    name: LightingReportFormFields,
    value: string | Date | { latitude: number; longitude: number }
  ) => {
    if (
      typeof value === "object" &&
      "latitude" in value &&
      "longitude" in value
    ) {
      if (name.includes("start")) {
        setValue("startLatitude", value.latitude);
        setValue("startLongitude", value.longitude);
      } else if (name.includes("end")) {
        setValue("endLatitude", value.latitude);
        setValue("endLongitude", value.longitude);
      }
    } else {
      setValue(name, value);
    }
    trigger(name);
  };

  const onSubmit = async () => {
    console.log("Start Coords:", startCoords);
    console.log("End Coords:", endCoords);
    if (startCoords && endCoords) {
      setValue("startLatitude", startCoords.latitude);
      setValue("startLongitude", startCoords.longitude);
      setValue("endLatitude", endCoords.latitude);
      setValue("endLongitude", endCoords.longitude);
    }
    updateValue("userId", user?.id || "");
    console.log(user?.id);
    updateValue("created_at", new Date());

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

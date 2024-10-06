import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelectLocation } from "@/src/common/context/location_context";
import { useUser } from "@/src/user/context/user_context";

const checkpoint_schema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres"),
  latitude: Yup.number()
    .required("La latitud es requerida")
    .min(-90, "Latitud mínima es -90")
    .max(90, "Latitud máxima es 90"),
  longitude: Yup.number()
    .required("La longitud es requerida")
    .min(-180, "Longitud mínima es -180")
    .max(180, "Longitud máxima es 180"),
  userId: Yup.string().required("El usuario es requerido"),
});

export interface CheckpointForm {
  name: string;
  latitude: number;
  longitude: number;
  userId: string;
}

type CheckpointFormFields = keyof CheckpointForm;

interface UseValidateFormProps {
  onSubmitCallback: (values: CheckpointForm) => void;
}

export const useValidatedForm = ({
  onSubmitCallback,
}: UseValidateFormProps) => {
  const {
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckpointForm>({
    resolver: yupResolver(checkpoint_schema),
    mode: "onChange",
  });

  const { user } = useUser();
  const { location } = useSelectLocation();

  const updateValue = (name: CheckpointFormFields, value: string | number) => {
    setValue(name, value);
    trigger(name);
  };

  const onSubmit = async () => {
    if (location) {
      updateValue("latitude", location.latitude);
      updateValue("longitude", location.longitude);
    }
    updateValue("userId", user?.id || "");

    await handleSubmit(
      async (data) => {
        await onSubmitCallback(data);
      },
      () => {
        console.log("error");
      }
    )();
  };

  return { updateValue, onSubmit, errors };
};

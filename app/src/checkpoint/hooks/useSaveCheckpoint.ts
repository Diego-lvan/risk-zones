import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelectLocation } from "@/src/common/context/location_context";
import { SaveCheckpointUseCase } from "../domain/use_cases/save_checkpoint_use_case";
import { router } from "expo-router";

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
});

export interface CheckpointForm {
  name: string;
  latitude: number;
  longitude: number;
}

type CheckpointFormFields = keyof CheckpointForm;

export const useValidatedForm = () => {
  const {
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckpointForm>({
    resolver: yupResolver(checkpoint_schema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: new SaveCheckpointUseCase().execute,
  });

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

    await handleSubmit(
      (data) => {
        console.log(data);
        mutation.mutate(data, {
          onSuccess: () => {
            console.log("success");
          },
          onError: () => {
            console.log("error");
          },
        });
      },
      () => {
        console.log("error");
      }
    )();
  };

  return { updateValue, onSubmit, errors };
};

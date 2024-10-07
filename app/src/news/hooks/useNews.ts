import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelectLocation } from "@/src/common/context/location_context";
import { SaveNewsUseCase } from "../domain/useCases/save_news_use_case";
import { NewsRepository } from "../infrastructure/repositories/news_repository";

const news_schema = Yup.object().shape({
  title: Yup.string()
    .required("El título es requerido")
    .test("max-words", "Máximo 6 palabras", (value) => {
      return value ? value.split(" ").length <= 6 : true;
    }),
  description: Yup.string()
    .required("La descripción es requerida")
    .test("max-words", "Máximo 50 palabras", (value) => {
      return value ? value.split(" ").length <= 50 : true;
    }),
  date: Yup.date().required("La fecha es requerida"),
  latitude: Yup.number()
    .required("La latitud es requerida")
    .min(-90, "Latitud mínima es -90")
    .max(90, "Latitud máxima es 90"),
  longitude: Yup.number()
    .required("La longitud es requerida")
    .min(-180, "Longitud mínima es -180")
    .max(180, "Longitud máxima es 180"),
});

export interface NewsForm {
  title: string;
  description: string;
  date: Date;
  latitude: number;
  longitude: number;
}

type NewsFormFields = keyof NewsForm;

export const useValidatedForm = () => {
  const {
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsForm>({
    resolver: yupResolver(news_schema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: new SaveNewsUseCase().execute,
  });

  const { location } = useSelectLocation();

  const updateValue = (name: NewsFormFields, value: string | number) => {
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

import { useSelectLocation } from "@/src/common/context/location_context";
import { useUser } from "@/src/user/context/user_context";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

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
    .required("La ubicación es requerida")
    .min(-90, "Latitud mínima es -90")
    .max(90, "Latitud máxima es 90"),
  longitude: Yup.number()
    .required("La longitud es requerida")
    .min(-180, "Longitud mínima es -180")
    .max(180, "Longitud máxima es 180"),
  userId: Yup.string().required("El usuario es requerido"),
});

export interface NewsForm {
  userId: string;
  title: string;
  description: string;
  date: Date;
  latitude: number;
  longitude: number;
}

type NewsFormFields = keyof NewsForm;

interface UseValidateFormProps {
  onSubmitCallback: (values: NewsForm) => void;
}

export const useValidatedForm = ({
  onSubmitCallback,
}: UseValidateFormProps) => {
  const {
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsForm>({
    resolver: yupResolver(news_schema),
    mode: "onChange",
  });

  const { user } = useUser();
  const { location } = useSelectLocation();

  const updateValue = (name: NewsFormFields, value: string | number | Date) => {
    setValue(name, value);
    trigger(name);
  };

  const onSubmit = async () => {
    if (location) {
      updateValue("latitude", location.latitude);
      updateValue("longitude", location.longitude);
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

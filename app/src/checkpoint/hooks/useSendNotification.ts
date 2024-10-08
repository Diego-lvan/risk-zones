import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { API_URL } from "@/common/constants/api";
import { checkpointNear } from "../utils/checkpoint-near";
import axios from "axios";
import { useUser } from "@/src/user/context/user_context";
import Constants from "expo-constants";

interface UseFormNotificationProps {
  setIsModalVisible: (visible: boolean) => void;
  setIsActiveRoute: (active: boolean) => void;
  isActiveRoute: boolean;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface UseFormNotificationReturn {
  contactPhone: string;
  handleContactPhoneChange: (text: string) => void;
  handlePressStartRoute: () => void;
  location: Location.LocationObject | null;
  checkpoints: CheckpointRes[];
  stopTrackingLocation: () => void;
}

export interface CheckpointRes {
  id: number;
  name: string;
  coords: {
    type: string;
    coordinates: [number, number];
  };
}

export const useFormNotification = (
  setIsModalVisible: UseFormNotificationProps["setIsModalVisible"],
  setIsActiveRoute: UseFormNotificationProps["setIsActiveRoute"],
  isActiveRoute: UseFormNotificationProps["isActiveRoute"]
): UseFormNotificationReturn => {
  const [contactPhone, setContactPhone] = useState<string>("");
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationInterval, setLocationInterval] = useState<NodeJS.Timeout | null>(null);
  const [checkpoints, setCheckpoints] = useState<CheckpointRes[]>([]);

  const { user } = useUser();
  console.log("user:", user);

  const handleContactPhoneChange = (text: string) => {
    setContactPhone(text);
    console.log(text);
  };

  const fetchCheckpoints = async () => {
    try {
      const response = await axios.get(`${API_URL}/checkpoint/user/${user?.id}`);
      const data = await response.data;

      if (response.status !== 200) {
        console.error("Error al obtener los checkpoints:", data);
        return;
      }
      setCheckpoints(data);
    } catch (error) {
      console.error("Error en el fetch de checkpoints:", error);
    }
  };

  const startTrackingLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const interval = setInterval(async () => {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Ubicación actual:", currentLocation);
      console.log({ checkpoints });
    }, 5000);

    setLocationInterval(interval);
  };

  const stopTrackingLocation = () => {
    if (locationInterval) {
      clearInterval(locationInterval);
      setLocationInterval(null);
    }
    console.log("stopped tracking location");
  };

  const handlePressStartRoute = () => {
    setIsModalVisible(false);
    setIsActiveRoute(true);
    startTrackingLocation();
  };

  useEffect(() => {
    fetchCheckpoints();
  }, [isActiveRoute]);

  // Configurar notificaciones

  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }

    try {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId ?? "", // Accede al projectId desde la configuración de Expo
        })
      ).data;
      console.log("Push token:", token);
    } catch (error) {
      console.error("Error al obtener el token de notificación:", error);
    }

    return token;
  };

  const sendNotification = async () => {
    if (location) {
      const checkpoint: number | null = checkpointNear(checkpoints, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (checkpoint !== null) {
        console.log("enviando notificación del checkpoint:", checkpoint);
        try {
          const res = await axios.post(`${API_URL}/checkpoint/notify`, {
            checkpointId: checkpoint,
            contactPhone,
            userId: user?.id,
          });

          // Notificación de éxito
          const checkpointName = checkpoints.find((c) => c.id === checkpoint)?.name;
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Notificación enviada",
              body: `La notificación de ${checkpointName} se ha enviado a tu contacto.`,
            },
            trigger: null,
          });
        } catch (error) {
          console.error("Error al enviar la notificación:", error);

          // Notificación de error
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Error",
              body: "Hubo un problema al enviar la notificación.",
            },
            trigger: null,
          });
        }
        setCheckpoints((prev) => prev.filter((c) => c.id !== checkpoint));
        console.log("Checkpoint cercano:", checkpoint);
      }
    }
  };

  useEffect(() => {
    sendNotification();
  }, [location]);

  useEffect(() => {
    return () => {
      if (locationInterval) {
        clearInterval(locationInterval);
      }
    };
  }, [locationInterval]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return {
    contactPhone,
    handleContactPhoneChange,
    handlePressStartRoute,
    location,
    checkpoints,
    stopTrackingLocation,
  };
};

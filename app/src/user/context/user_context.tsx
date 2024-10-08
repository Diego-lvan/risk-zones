import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserEntity } from "../domain/entities/user_entity";
import * as SecureStorage from "expo-secure-store";
import { GetUserUseCase } from "../domain/use_cases/get_user_use_case";

interface UserContextType {
  user: UserEntity | null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

type UserProviderProps = PropsWithChildren<{}>;

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const setLoadingFunction = () => {
    setLoading(true);
  };

  const loadUser = async () => {
    setLoadingFunction();
    let user = await SecureStorage.getItemAsync("user");
    console.log("Imprimiendo user", user);
    if (!user) {
      try {
        const userUseCase = new GetUserUseCase();
        const newUser = await userUseCase.execute();
        setUser(newUser);
        console.log("Imprimiendo newUser", newUser);
        await SecureStorage.setItemAsync("user", JSON.stringify(newUser));
      } catch (error) {
        console.log(error);
        console.log("Error al obtener el usuario");
      }
    } else {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,
    isLoading: loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

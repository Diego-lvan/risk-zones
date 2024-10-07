import axios from "axios";
import { UserDataSource } from "../../domain/datasources/user_datasource";
import { UserEntity } from "../../domain/entities/user_entity";
import { API_URL } from "@/common/constants/api";
import { UserModel } from "../models/user_model";

export class UserDataSourceImpl implements UserDataSource {
  async getUser(): Promise<UserEntity> {
    try {
      console.log("getUser");
      const { data, status } = await axios.post<UserModel>(`${API_URL}/user`);
      if (status !== 201) {
        throw new Error();
      }
      return {
        id: data.id,
      };
    } catch (error) {
      throw new Error();
    }
  }
}

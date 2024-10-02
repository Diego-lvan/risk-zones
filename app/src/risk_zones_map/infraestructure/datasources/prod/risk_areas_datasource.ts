import { API_URL } from "@/common/constants/api";
import { RiskAreasDatasource } from "@/src/risk_zones_map/domain/datasources/risk_areas_datasource";
import { RiskPoint } from "@/src/risk_zones_map/domain/entities/risk_point_entity";
import axios from "axios";

export class RiskAreasDatasourceImplProd implements RiskAreasDatasource {
    async getRiskPoints(latitude: number, longitude: number, radius: number): Promise<RiskPoint[]> {
        const {data, status} = await axios.get<RiskPoint[]>(API_URL + '/risk-areas', {
            params: {
              longitude: longitude,
              latitude: latitude,
              radius: radius
            },
            timeout: 5000
        });

        if( status != 200){
            throw new Error('Error fetching risk points');
        }

        return data;
    }
}

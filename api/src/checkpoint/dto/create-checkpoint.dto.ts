import { IsDecimal, IsString } from "class-validator";

export class CreateCheckpointDto {
    @IsString()
    name: string;
    @IsDecimal()
    latitude: number;
    @IsDecimal()
    longitude: number;
    @IsString()
    userId: string;
}

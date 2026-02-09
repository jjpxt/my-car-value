import { IsString, IsNumber, Min, Max, IsLatitude, IsLongitude } from "class-validator";

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1830)
    @Max(2028)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

    @Min(1)
    @Max(1000000)
    price: number;
}
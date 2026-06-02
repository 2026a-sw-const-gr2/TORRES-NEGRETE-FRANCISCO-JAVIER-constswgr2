import { LaptopsService } from './laptops.service';
import { CreateLaptopDto } from './dto/create-laptop.dto';
export declare class LaptopsController {
    private readonly laptopsService;
    constructor(laptopsService: LaptopsService);
    create(dto: CreateLaptopDto): Promise<import("../../database/entities/laptop.entity").LaptopEntity>;
    findAll(): Promise<import("../../database/entities/laptop.entity").LaptopEntity[]>;
    findOne(id: number): Promise<import("../../database/entities/laptop.entity").LaptopEntity | null>;
    update(id: number, dto: Partial<CreateLaptopDto>): Promise<import("../../database/entities/laptop.entity").LaptopEntity | null>;
    remove(id: number): Promise<import("../../database/entities/laptop.entity").LaptopEntity | null>;
}

import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { LaptopEntity } from '../../database/entities/laptop.entity';
export declare class LaptopsService {
    private readonly repo;
    private readonly eventsService;
    constructor(repo: Repository<LaptopEntity>, eventsService: EventsService);
    private buildEventKey;
    create(dto: CreateLaptopDto): Promise<LaptopEntity>;
    findAll(): Promise<LaptopEntity[]>;
    findOne(id: number): Promise<LaptopEntity | null>;
    update(id: number, dto: Partial<CreateLaptopDto>): Promise<LaptopEntity | null>;
    remove(id: number): Promise<LaptopEntity | null>;
}

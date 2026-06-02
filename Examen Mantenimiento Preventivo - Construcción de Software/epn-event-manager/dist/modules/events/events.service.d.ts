import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateEventEntity } from '../../database/entities/create-event.entity';
import { UpdateEventEntity } from '../../database/entities/update-event.entity';
import { DeleteEventEntity } from '../../database/entities/delete-event.entity';
import { QueryEventEntity } from '../../database/entities/query-event.entity';
export declare class EventsService {
    private readonly createRepo;
    private readonly updateRepo;
    private readonly deleteRepo;
    private readonly queryRepo;
    constructor(createRepo: Repository<CreateEventEntity>, updateRepo: Repository<UpdateEventEntity>, deleteRepo: Repository<DeleteEventEntity>, queryRepo: Repository<QueryEventEntity>);
    registerEvent(dto: CreateEventDto): Promise<{
        ok: boolean;
    }>;
    findAll(): Promise<object[]>;
    findBySource(source: string): Promise<object[]>;
    findByEntity(entity: string): Promise<object[]>;
    getStats(): Promise<object>;
}

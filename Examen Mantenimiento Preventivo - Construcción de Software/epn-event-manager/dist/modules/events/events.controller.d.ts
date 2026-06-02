import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    registerEvent(dto: CreateEventDto): Promise<{
        ok: boolean;
    }>;
    findAll(): Promise<object[]>;
    findBySource(source: string): Promise<object[]>;
    findByEntity(entity: string): Promise<object[]>;
}

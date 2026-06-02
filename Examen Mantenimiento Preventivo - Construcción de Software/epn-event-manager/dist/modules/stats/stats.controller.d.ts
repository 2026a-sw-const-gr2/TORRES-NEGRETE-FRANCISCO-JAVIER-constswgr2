import { EventsService } from '../events/events.service';
export declare class StatsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getStats(): Promise<object>;
}

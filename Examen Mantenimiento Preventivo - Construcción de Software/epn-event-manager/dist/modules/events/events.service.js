"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_event_entity_1 = require("../../database/entities/create-event.entity");
const update_event_entity_1 = require("../../database/entities/update-event.entity");
const delete_event_entity_1 = require("../../database/entities/delete-event.entity");
const query_event_entity_1 = require("../../database/entities/query-event.entity");
let EventsService = class EventsService {
    createRepo;
    updateRepo;
    deleteRepo;
    queryRepo;
    constructor(createRepo, updateRepo, deleteRepo, queryRepo) {
        this.createRepo = createRepo;
        this.updateRepo = updateRepo;
        this.deleteRepo = deleteRepo;
        this.queryRepo = queryRepo;
    }
    async registerEvent(dto) {
        const action = (dto.action ?? '').toUpperCase();
        const payloadStr = JSON.stringify(dto.payload ?? {});
        const localDate = new Date().toLocaleString();
        if (action === 'CREATE') {
            const ev = this.createRepo.create({
                source: dto.source,
                entity: dto.entity,
                action: dto.action,
                title: dto.title,
                description: dto.description,
                payload: payloadStr,
                eventKey: dto.eventKey,
                recorded_at: localDate,
            });
            await this.createRepo.save(ev);
            return { ok: true };
        }
        if (action === 'UPDATE') {
            const ev = this.updateRepo.create({
                source: dto.source,
                entity: dto.entity,
                action: dto.action,
                title: dto.title,
                description: dto.description,
                payload: payloadStr,
                eventKey: dto.eventKey,
                timestamp: localDate,
            });
            await this.updateRepo.save(ev);
            return { ok: true };
        }
        if (action === 'DELETE') {
            this.deleteRepo.create({
                source: dto.source,
                entity: dto.entity,
                action: dto.action,
                title: dto.title,
                payload: payloadStr,
                eventKey: dto.eventKey,
                createdAt: localDate,
            });
            return { ok: true };
        }
        if (action === 'QUERY') {
            const ev = this.queryRepo.create({
                source: dto.source,
                entity: dto.entity,
                action: dto.action,
                title: dto.title,
                description: dto.description,
                payload: payloadStr,
                eventKey: dto.eventKey,
                event_date: localDate,
            });
            await this.queryRepo.save(ev);
            return { ok: true };
        }
        return { ok: false };
    }
    async findAll() {
        const creates = await this.createRepo.find();
        const updates = await this.updateRepo.find();
        const deletes = await this.deleteRepo.find();
        const queries = await this.queryRepo.find();
        const merged = [
            ...creates.map((e) => ({ ...e, _table: 'create_events' })),
            ...updates.map((e) => ({ ...e, _table: 'update_events' })),
            ...deletes.map((e) => ({ ...e, _table: 'delete_events' })),
            ...queries.map((e) => ({ ...e, _table: 'query_events' })),
        ];
        merged.sort((a, b) => {
            const ra = a;
            const rb = b;
            const ta = ra.recorded_at ?? ra.timestamp ?? ra.createdAt ?? ra.event_date ?? '';
            const tb = rb.recorded_at ?? rb.timestamp ?? rb.createdAt ?? rb.event_date ?? '';
            return ta.localeCompare(tb);
        });
        return merged;
    }
    async findBySource(source) {
        const creates = await this.createRepo.findBy({ source });
        const updates = await this.updateRepo.findBy({ source });
        const deletes = await this.deleteRepo.findBy({ source });
        const queries = await this.queryRepo.findBy({ source });
        return [...creates, ...updates, ...deletes, ...queries];
    }
    async findByEntity(entity) {
        const creates = await this.createRepo.findBy({ entity });
        const updates = await this.updateRepo.findBy({ entity });
        const deletes = await this.deleteRepo.findBy({ entity });
        const queries = await this.queryRepo.findBy({ entity });
        return [...creates, ...updates, ...deletes, ...queries];
    }
    async getStats() {
        const createCount = await this.createRepo.count();
        const updateCount = await this.updateRepo.count();
        const deleteCount = await this.deleteRepo.count();
        return {
            create: createCount,
            update: updateCount,
            delete: deleteCount,
            total: createCount + updateCount + deleteCount,
        };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(create_event_entity_1.CreateEventEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(update_event_entity_1.UpdateEventEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(delete_event_entity_1.DeleteEventEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(query_event_entity_1.QueryEventEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map
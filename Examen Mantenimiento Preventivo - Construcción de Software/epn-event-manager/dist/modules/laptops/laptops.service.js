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
exports.LaptopsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const events_service_1 = require("../events/events.service");
const laptop_entity_1 = require("../../database/entities/laptop.entity");
let LaptopsService = class LaptopsService {
    repo;
    eventsService;
    constructor(repo, eventsService) {
        this.repo = repo;
        this.eventsService = eventsService;
    }
    buildEventKey(action, laptop) {
        const name = laptop.name ?? 'unknown';
        const brand = laptop.brand ?? 'unknown';
        const ram = laptop.ram ?? 'na';
        const storage = laptop.storage ?? 'na';
        const id = laptop.id ?? 'na';
        return `crud-laptops:${action}:laptop:${id}:${name}:${brand}:${ram}:${storage}`;
    }
    async create(dto) {
        const now = new Date().toLocaleString();
        const entity = this.repo.create({ ...dto, createdAt: now });
        const saved = await this.repo.save(entity);
        const event = {
            source: 'crud-laptops',
            entity: 'laptop',
            action: 'CREATE',
            title: 'Laptop creada',
            description: `Se creó la laptop ${saved.name}`,
            payload: saved,
            eventKey: this.buildEventKey('CREATE', dto),
        };
        await this.eventsService.registerEvent(event);
        return saved;
    }
    async findAll() {
        const items = await this.repo.find();
        const event = {
            source: 'crud-laptops',
            entity: 'laptop',
            action: 'QUERY',
            title: 'Listado de laptops',
            description: 'Se consultó el listado de laptops',
            payload: { count: items.length },
            eventKey: 'crud-laptops:QUERY:laptop:list-all',
        };
        await this.eventsService.registerEvent(event);
        return items;
    }
    async findOne(id) {
        return await this.repo.findOneBy({ id });
    }
    async update(id, dto) {
        const existing = await this.repo.findOneBy({ id });
        if (!existing)
            return null;
        const merged = this.repo.merge(existing, dto);
        const saved = await this.repo.save(merged);
        const event = {
            source: 'crud-laptops',
            entity: 'laptop',
            action: 'UPDATE',
            title: 'Laptop actualizada',
            description: `Se actualizó la laptop ${saved.name}`,
            payload: saved,
            eventKey: this.buildEventKey('UPDATE', { id, ...dto }),
        };
        await this.eventsService.registerEvent(event);
        return saved;
    }
    async remove(id) {
        const existing = await this.repo.findOneBy({ id });
        if (!existing)
            return null;
        await this.repo.delete(id);
        const event = {
            source: 'crud-laptops',
            entity: 'laptop',
            action: 'DELETE',
            title: 'Laptop eliminada',
            description: `Se eliminó la laptop ${existing.name}`,
            payload: existing,
            eventKey: this.buildEventKey('DELETE', existing),
        };
        await this.eventsService.registerEvent(event);
        return existing;
    }
};
exports.LaptopsService = LaptopsService;
exports.LaptopsService = LaptopsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(laptop_entity_1.LaptopEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        events_service_1.EventsService])
], LaptopsService);
//# sourceMappingURL=laptops.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_event_entity_1 = require("./entities/create-event.entity");
const update_event_entity_1 = require("./entities/update-event.entity");
const delete_event_entity_1 = require("./entities/delete-event.entity");
const query_event_entity_1 = require("./entities/query-event.entity");
const laptop_entity_1 = require("./entities/laptop.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'better-sqlite3',
                database: 'db/events.sqlite',
                entities: [
                    create_event_entity_1.CreateEventEntity,
                    update_event_entity_1.UpdateEventEntity,
                    delete_event_entity_1.DeleteEventEntity,
                    query_event_entity_1.QueryEventEntity,
                    laptop_entity_1.LaptopEntity,
                ],
                synchronize: true,
            }),
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map
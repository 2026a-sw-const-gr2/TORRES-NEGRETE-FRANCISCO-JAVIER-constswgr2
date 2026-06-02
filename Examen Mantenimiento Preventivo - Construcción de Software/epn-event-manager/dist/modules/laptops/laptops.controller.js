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
exports.LaptopsController = void 0;
const common_1 = require("@nestjs/common");
const laptops_service_1 = require("./laptops.service");
const create_laptop_dto_1 = require("./dto/create-laptop.dto");
let LaptopsController = class LaptopsController {
    laptopsService;
    constructor(laptopsService) {
        this.laptopsService = laptopsService;
    }
    create(dto) {
        return this.laptopsService.create(dto);
    }
    findAll() {
        return this.laptopsService.findAll();
    }
    findOne(id) {
        return this.laptopsService.findOne(id);
    }
    update(id, dto) {
        return this.laptopsService.update(id, dto);
    }
    remove(id) {
        return this.laptopsService.remove(id);
    }
};
exports.LaptopsController = LaptopsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_laptop_dto_1.CreateLaptopDto]),
    __metadata("design:returntype", void 0)
], LaptopsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LaptopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LaptopsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], LaptopsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LaptopsController.prototype, "remove", null);
exports.LaptopsController = LaptopsController = __decorate([
    (0, common_1.Controller)('laptops'),
    __metadata("design:paramtypes", [laptops_service_1.LaptopsService])
], LaptopsController);
//# sourceMappingURL=laptops.controller.js.map
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { CreateEventDto } from '../events/dto/create-event.dto';
import { LaptopEntity } from '../../database/entities/laptop.entity';

@Injectable()
export class LaptopsService {
  constructor(
    @InjectRepository(LaptopEntity)
    private readonly repo: Repository<LaptopEntity>,
    private readonly eventsService: EventsService,
  ) {}

  private buildEventKey(action: string, laptop: Partial<LaptopEntity>): string {
    const name = laptop.name ?? 'unknown';
    const brand = laptop.brand ?? 'unknown';
    const ram = laptop.ram ?? 'na';
    const storage = laptop.storage ?? 'na';
    const id = laptop.id ?? 'na';
    return `crud-laptops:${action}:laptop:${id}:${name}:${brand}:${ram}:${storage}`;
  }

  async create(dto: CreateLaptopDto) {
    const now = new Date().toLocaleString();
    const entity = this.repo.create({ ...dto, createdAt: now });
    const saved = await this.repo.save(entity);

    const event: CreateEventDto = {
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

    const event: CreateEventDto = {
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

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, dto: Partial<CreateLaptopDto>) {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) return null;
    const merged = this.repo.merge(existing, dto);
    const saved = await this.repo.save(merged);

    const event: CreateEventDto = {
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

  async remove(id: number) {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) return null;
    await this.repo.delete(id);

    const event: CreateEventDto = {
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
}

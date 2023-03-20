// TODO: Вынести в types директорию
export type Guid = string;
export type EntityId = number | Guid;

export abstract class Repository<T> {
    create(entity: T) {}
    getById(id: EntityId) {}
    getAll() {}
    update(id: EntityId, entity: T) {}
    delete(id: EntityId) {}
}
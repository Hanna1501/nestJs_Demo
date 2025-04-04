import { Model, FilterQuery, HydratedDocument, Types } from 'mongoose';

export abstract class AbstractRepository<T extends HydratedDocument<any> & { _id: Types.ObjectId }> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async create(createDto: any): Promise<T> {
    const createdEntity = new this.model(createDto);
    return createdEntity.save() as Promise<T>;
  }

  async update(id: string, updateDto: any): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedEntity = await this.model.findByIdAndDelete(id).exec();
    if (!deletedEntity) {
      throw new Error(`Entity with ID ${id} not found`);
    }
    return { message: 'Deleted successfully' };
  }
}

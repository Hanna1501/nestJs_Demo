import { ClientSession } from 'mongoose';
import { UsersDocument } from 'src/schemas/Users.schema';

export interface IUserRepository {
    create(userData: Partial<UsersDocument>, session?: ClientSession): Promise<UsersDocument>;
}

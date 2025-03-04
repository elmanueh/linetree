import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User) {
    const createdUser = new this.userModel(user);
    await createdUser.save();
  }

  async login(user: User) {
    const foundUser = await this.userModel.findOne({ email: user.email });
    if (!foundUser || foundUser.password !== user.password)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid email or password',
      });

    // TODO: Devolver un token JWT
  }

  async findOne(id: string): Promise<User> {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'The user ID is not valid',
      });
    }

    const user = await this.userModel.findById(objectId);
    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }

  async remove(id: string) {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'The user ID is not valid',
      });
    }

    await this.userModel.findByIdAndDelete(id);
  }
}

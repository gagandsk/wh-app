import { AppDataSource } from "../config/data-source";
import { User } from "./user.entity";
import { FindManyOptions, Like } from "typeorm";
import {
  PaginatedResult,
  CreateUserDto,
  UpdateUserDto,
  UserRole,
} from "../types";

const userRepository = AppDataSource.getRepository(User);

interface UserFilterCriteria {
  name?: string | undefined;
  email?: string | undefined;
  role?: UserRole;
}

export class UserRepository {
  async create(userData: CreateUserDto): Promise<User> {
    const newUser = userRepository.create(userData);
    return userRepository.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    return userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return userRepository.findOneBy({ email });
  }

  async findAll(
    page: number,
    limit: number,
    criteria: UserFilterCriteria
  ): Promise<PaginatedResult<User>> {
    const skip = (page - 1) * limit;

    const options: FindManyOptions<User> = {
      order: { name: "ASC" },
      take: limit,
      skip: skip,
      where: {},
    };

    if (criteria.name || criteria.email) {
      const nameOrEmailConditions = [];

      if (criteria.name) {
        nameOrEmailConditions.push({ name: Like(`%${criteria.name}%`) });
      }

      if (criteria.email) {
        nameOrEmailConditions.push({ email: Like(`%${criteria.email}%`) });
      }

      if (nameOrEmailConditions.length > 0) {
        options.where = {
          ...(criteria.name ? { name: Like(`%${criteria.name}%`) } : {}),
          ...(criteria.email ? { email: Like(`%${criteria.email}%`) } : {}),
        };
      }
    }

    if (criteria.role) {
      options.where = {
        ...options.where,
        role: criteria.role,
      };
    }

    const [data, total] = await userRepository.findAndCount(options);
    const pages = Math.ceil(total / limit);
    return { data, total, pages, currentPage: page };
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User | null> {
    const user = await userRepository.findOneBy({ id });
    if (!user) return null;

    userRepository.merge(user, updateData);
    return userRepository.save(user);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await userRepository.delete(id);
    return deleteResult.affected !== 0;
  }
}

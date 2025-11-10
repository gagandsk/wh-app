import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import {
  UserPaginationParams,
  PaginatedResult,
  CreateUserDto,
  UpdateUserDto,
  UserRole,
} from "../types";
import { HttpError } from "../middleware/error-handler";

interface UserFilterCriteria {
  name?: string;
  email?: string;
  role?: UserRole;
}

function parseFilterQuery(filterString: string): UserFilterCriteria {
  const criteria: UserFilterCriteria = {};
  if (!filterString) return criteria;

  filterString.split("&").forEach((pair) => {
    const [key, value] = pair.split("=").map(decodeURIComponent);

    if (
      value &&
      typeof key === "string" &&
      ["name", "email", "role"].includes(key)
    ) {
      if (key === "role") {
        criteria.role = value as UserRole;
      } else {
        // @ts-ignore
        criteria[key] = value;
      }
    }
  });
  return criteria;
}

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async findAll(params: UserPaginationParams): Promise<PaginatedResult<User>> {
    const { page, limit, filter } = params;

    if (limit > 100) {
      throw new HttpError("El límite de resultados no puede exceder 100.", 400);
    }

    const filterCriteria = parseFilterQuery(filter);

    return this.repository.findAll(page, limit, filterCriteria);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const existingUser = await this.repository.findByEmail(data.email);
    if (existingUser) {
      throw new HttpError("El email ya está registrado.", 409);
    }

    return this.repository.create(data);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new HttpError("Usuario no encontrado", 404);
    }
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    if (data.email) {
      const existingUser = await this.repository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new HttpError(
          "El nuevo email ya está en uso por otro usuario.",
          409
        );
      }
    }

    const user = await this.repository.update(id, data);
    if (!user) {
      throw new HttpError("Usuario no encontrado para actualizar", 404);
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new HttpError("Usuario no encontrado para eliminar", 404);
    }
  }
}

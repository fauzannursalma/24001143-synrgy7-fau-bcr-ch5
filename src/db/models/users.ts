import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  id!: number;
  fullname!: string;
  email!: string;
  phone!: string;
  address!: string;
  role!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      rent: {
        relation: Model.HasManyRelation,
        modelClass: require("./rent").RentModel,
        join: {
          from: "users.id",
          to: "rent.user_id",
        },
      },
    };
  }
}

export type Users = ModelObject<UsersModel>;

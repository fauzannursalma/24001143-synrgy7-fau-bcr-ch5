import { Model, ModelObject } from "objection";

export class UserModel extends Model {
  fullname!: string;
  email!: string;
  phone!: string;
  address!: string;
  role?: string;

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

export type Users = ModelObject<UserModel>;

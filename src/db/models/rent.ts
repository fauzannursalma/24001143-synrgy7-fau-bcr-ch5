import { Model, ModelObject, RelationMappings } from "objection";
import { UserModel } from "./users";
import { CarsModel } from "./cars";

export class RentModel extends Model {
  start_date!: Date;
  end_date!: Date;
  total_price!: number;
  status!: string;
  user_id!: number;
  car_id!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "rent";
  }

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "rent.user_id",
          to: "users.id",
        },
      },
      car: {
        relation: Model.BelongsToOneRelation,
        modelClass: CarsModel,
        join: {
          from: "rent.car_id",
          to: "cars.id",
        },
      },
    };
  }
}

export type Rent = ModelObject<RentModel>;

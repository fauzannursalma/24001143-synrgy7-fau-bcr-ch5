import { Model, ModelObject } from "objection";
import { RentModel } from "./rent";

export class CarsModel extends Model {
  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  availableAt!: string;
  transmission!: string;
  available!: boolean;
  type!: string;
  year!: number;
  image_public_id!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return "cars";
  }

  static get relationMappings() {
    return {
      rent: {
        relation: Model.HasManyRelation,
        modelClass: RentModel,
        join: {
          from: "cars.id",
          to: "rent.car_id",
        },
      },
    };
  }
}

export type Cars = ModelObject<CarsModel>;

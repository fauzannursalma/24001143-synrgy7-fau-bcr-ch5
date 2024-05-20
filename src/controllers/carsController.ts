import { Response, Request } from "express";
import { CarsModel } from "../db/models/cars";
import { ResponseHelper } from "../helpers/responseHelper";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "../utils/cloudinaryImageUtils";
import { randomUUID } from "crypto";

export class CarsController extends ResponseHelper {
  carList = async (req: Request, res: Response) => {
    try {
      const cars = await CarsModel.query();
      return this.success("Data ditemukan", cars, 200)(res);
    } catch (error: Error | any) {
      return this.error("Data tidak ditemukan", null, 404)(res);
    }
  };

  getCarByID = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const car = await CarsModel.query().findById(id);
      return this.success("Data ditemukan", car, 200)(res);
    } catch (error: Error | any) {
      return this.error("Data tidak ditemukan", null, 404)(res);
    }
  };

  createCar = async (req: Request, res: Response) => {
    try {
      const gambar = await uploadImageToCloudinary(req.file, "cars");
      const id = randomUUID();
      const cars = await CarsModel.query().insert({
        id: id,
        plate: req.body.plate,
        manufacture: req.body.manufacture,
        model: req.body.model,
        image: gambar.secure_url,
        rentPerDay: req.body.rentPerDay,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        available: req.body.available,
        type: req.body.type,
        year: req.body.year,
        image_public_id: gambar.public_id,
      });

      return this.success("Data berhasil ditambahkan", cars, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  deleteCarByID = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const data = await CarsModel.query().findById(id);
      if (data?.image) {
        await deleteImageFromCloudinary(data.image_public_id);
      }
      const cars = await CarsModel.query().deleteById(id);
      if (!cars) return this.error("Data tidak ditemukan", null, 404)(res);
      return this.success(
        `Data dengan id ${id} berhasil dihapus`,
        cars,
        200
      )(res);
    } catch (error: Error | any) {
      return this.error(`Data gagal dihapus`, null, 404)(res);
    }
  };

  updateCar = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const carById = await CarsModel.query().findById(id);

      if (!carById) {
        return this.error("Data tidak ditemukan", null, 404)(res);
      }

      let updatedCarData: Partial<CarsModel> = {};

      if (req.file) {
        if (carById.image) {
          await deleteImageFromCloudinary(carById.image_public_id);
        }
        const gambar = await uploadImageToCloudinary(req.file, "cars");
        updatedCarData.image = gambar.secure_url;
        updatedCarData.image_public_id = gambar.public_id;
      }

      req.body.plate && (updatedCarData.plate = req.body.plate);
      req.body.manufacture &&
        (updatedCarData.manufacture = req.body.manufacture);
      req.body.model && (updatedCarData.model = req.body.model);
      req.body.rentPerDay && (updatedCarData.rentPerDay = req.body.rentPerDay);
      req.body.capacity && (updatedCarData.capacity = req.body.capacity);
      req.body.description &&
        (updatedCarData.description = req.body.description);
      req.body.availableAt &&
        (updatedCarData.availableAt = req.body.availableAt);
      req.body.transmission &&
        (updatedCarData.transmission = req.body.transmission);
      req.body.available && (updatedCarData.available = req.body.available);
      req.body.type && (updatedCarData.type = req.body.type);
      req.body.year && (updatedCarData.year = req.body.year);

      const updatedCar = await CarsModel.query().patchAndFetchById(
        id,
        updatedCarData
      );

      if (!updatedCar) {
        return this.error("Data gagal diubah", null, 404)(res);
      }

      return this.success(
        `Data dengan id ${id} berhasil diubah`,
        updatedCar,
        200
      )(res);
    } catch (error: Error | any) {
      console.error("Error updating car:", error);
      return this.error(error.message, null, 404)(res);
    }
  };
}

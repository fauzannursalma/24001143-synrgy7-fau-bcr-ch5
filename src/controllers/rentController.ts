import { Response, Request } from "express";
import { RentModel } from "../db/models/rent";
import { ResponseHelper } from "../helpers/responseHelper";

export class RentController extends ResponseHelper {
  rentList = async (req: Request, res: Response) => {
    try {
      const rents = await RentModel.query();
      return this.success("Data ditemukan", rents, 200)(res);
    } catch (error: Error | any) {
      return this.error("Data tidak ditemukan", null, 404)(res);
    }
  };

  getRentByID = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const rent = await RentModel.query()
        .findById(id)
        .withGraphFetched("[user(selectUserFields), car(selectCarFields)]")
        .modifiers({
          selectUserFields: (builder) => {
            builder.select("id", "fullname", "email");
          },
          selectCarFields: (builder) => {
            builder.select("id", "plate", "manufacture", "model");
          },
        });

      if (!rent) {
        return this.error("Data tidak ditemukan", null, 404)(res);
      }

      return this.success("Data ditemukan", rent, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 500)(res);
    }
  };

  createRent = async (req: Request, res: Response) => {
    try {
      // Validasi input
      const { start_date, end_date, total_price, user_id, car_id } = req.body;
      if (!start_date || !end_date || !total_price || !user_id || !car_id) {
        return this.error("Semua field harus diisi", null, 400)(res);
      }

      const rent = await RentModel.query().insert({
        start_date,
        end_date,
        total_price,
        user_id,
        car_id,
      });
      console.log(rent);
      return this.success("Data berhasil ditambahkan", rent, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 500)(res);
    }
  };

  deleteRentByID = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const data = await RentModel.query().findById(id);
      if (data) {
        await RentModel.query().deleteById(id);
        return this.success("Data berhasil dihapus", data, 200)(res);
      }
      return this.error("Data tidak ditemukan", null, 404)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  updateRent = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const { start_date, end_date, total_price, status, user_id, car_id } =
        req.body;

      if (
        !start_date ||
        !end_date ||
        !total_price ||
        !status ||
        !user_id ||
        !car_id
      ) {
        return this.error("Semua field harus diisi", null, 400)(res);
      }

      const rent = await RentModel.query().patchAndFetchById(id, {
        start_date,
        end_date,
        total_price,
        status,
        user_id,
        car_id,
      });

      return this.success("Data berhasil diupdate", rent, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 500)(res);
    }
  };
}

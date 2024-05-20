import { Response, Request } from "express";
import { UserModel } from "../db/models/users";
import { ResponseHelper } from "../helpers/responseHelper";

export class UsersController extends ResponseHelper {
  userList = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.query();
      return this.success("Data ditemukan", users, 200)(res);
    } catch (error: Error | any) {
      return this.error("Data tidak ditemukan", null, 404)(res);
    }
  };

  getUserByID = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const user = await UserModel.query().findById(id);
      return this.success("Data ditemukan", user, 200)(res);
    } catch (error: Error | any) {
      return this.error("Data tidak ditemukan", null, 404)(res);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      // Validasi input
      const { fullname, email, phone, address } = req.body;
      if (!fullname || !email || !phone || !address) {
        return this.error("Semua field harus diisi", null, 400)(res);
      }

      const user = await UserModel.query().insert({
        fullname,
        email,
        phone,
        address,
      });
      return this.success("Data berhasil ditambahkan", user, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 500)(res);
    }
  };

  deleteUserByID = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const data = await UserModel.query().findById(id);
      if (data) {
        await UserModel.query().deleteById(id);
        return this.success("Data berhasil dihapus", data, 200)(res);
      }
      return this.error("Data tidak ditemukan", null, 404)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const user = await UserModel.query().findById(id);
      if (user) {
        await UserModel.query().findById(id).patch({
          fullname: req.body.fullname,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          role: req.body.role,
        });
        return this.success("Data berhasil diupdate", user, 200)(res);
      }
      return this.error("Data tidak ditemukan", null, 404)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };
}

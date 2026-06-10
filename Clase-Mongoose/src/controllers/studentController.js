import { Student } from "../models/studentModel.js";

export async function findStudents(req, res, next) {
  try {
    const { site, active, pass, sortBy, order, page, limit } = req.query;
    const filters = {};

    if (site !== undefined) {
      filters.site = site;
    }

    if (active !== undefined) {
      if (active !== "true" && active !== "false") {
        const error = new Error("active must be 'true' or 'false'");
        error.statusCode = 400;
        throw error;
      }

      filters.active = active === "true";
    }

    if (pass !== undefined) {
      if (pass !== "true" && pass !== "false") {
        const error = new Error("pass must be 'true' or 'false'");
        error.statusCode = 400;
        throw error;
      }

      filters.grade = pass === "true" ? { $gte: 60 } : { $lt: 60 };
    }

    let query = Student.find(filters);

    if (sortBy !== undefined) {
      query = query.sort({
        [sortBy]: order === "desc" ? -1 : 1
      });
    }

    if (page !== undefined && limit !== undefined) {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      if (!Number.isInteger(pageNumber) || !Number.isInteger(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
        const error = new Error("page and limit must be positive integers");
        error.statusCode = 400;
        throw error;
      }

      query = query
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
    }

    const students = await query;

    return res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    return next(error);
  }
}

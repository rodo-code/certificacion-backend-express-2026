import {
  createStudent,
  getStudentById,
  replaceStudentById,
  getFilteredStudentsFromDB,
  updateStudentById,
  deleteStudentLogicallyById
} from "../services/studentService.js";

import { validateStudentBody } from "../utils/studentValidator.js";
import mongoose from "mongoose";

export async function findStudents(req, res, next) {
  try {
    const { pass, site, page, limit, sortBy, order } = req.query;

    if (pass !== undefined && pass !== "true" && pass !== "false") {
      const error = Error("Query parameter 'pass' must be 'true' or 'false'");
      error.statusCode = 400;
      return next(error);
    }

    if (site !== undefined && site !== "LP" && site !== "CB" && site !== "SC") {
      const error = Error("Query parameter 'site' must be 'LP' or 'CB' or 'SC'");
      error.statusCode = 400;
      return next(error);
    }

    if (page !== undefined || limit !== undefined) {
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 1;
      if (pageNumber <= 0 || limitNumber <= 0) {
        const error = Error("Pagination parameters are invalid");
        error.statusCode = 400;
        return next(error);
      }
    }

    const studentList = await getFilteredStudentsFromDB({ pass, site, page, limit, sortBy, order });

    return res.success(200, "Students successfully retrieved from database", studentList);
  } catch (error) {
    return next(error);
  }
}

export async function saveStudent(req, res, next) {
  try {
    const studentValidator = validateStudentBody(req.body, false, true);

    if (!studentValidator.validation) {
      const error = Error(studentValidator.message);
      error.statusCode = 400;
      return next(error);
    }

    const newStudent = await createStudent(req.body);
    return res.success(201, "Student created successfully in MongoDB", newStudent);
  } catch (error) {
    return next(error);
  }
}

export async function findStudentById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = Error("The provided ID is not a valid MongoDB ObjectId");
      error.statusCode = 400;
      return next(error);
    }

    const student = await getStudentById(id);

    if (!student) {
      const error = Error("Student not found");
      error.statusCode = 404;
      return next(error);
    }

    return res.success(200, `Student with id ${id} successfully retrieved`, student);
  } catch (error) {
    return next(error);
  }
}

export async function replaceStudent(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = Error("The provided ID is not a valid MongoDB ObjectId");
      error.statusCode = 400;
      return next(error);
    }

    const studentValidator = validateStudentBody(req.body, false, true);
    if (!studentValidator.validation) {
      const error = Error(studentValidator.message);
      error.statusCode = 400;
      return next(error);
    }

    const updatedStudent = await replaceStudentById(id, req.body);
    if (updatedStudent) {
      return res.success(200, `Student with id ${id} successfully fully updated`, updatedStudent);
    } else {
      const error = Error(`Student with id ${id} was not found`);
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
}

export async function updateStudent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = Error("The provided ID is not a valid MongoDB ObjectId");
      error.statusCode = 400;
      return next(error);
    }

    const studentValidator = validateStudentBody(req.body, false, false);
    if (!studentValidator.validation) {
      const error = Error(studentValidator.message);
      error.statusCode = 400;
      return next(error);
    }

    const updateResponse = await updateStudentById(id, req.body);
    if (updateResponse.success) {
      return res.success(200, `Student with id ${id} was updated successfully`, updateResponse.data);
    } else {
      const error = Error(updateResponse.message);
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = Error("The provided ID is not a valid MongoDB ObjectId");
      error.statusCode = 400;
      return next(error);
    }

    const deleteResponse = await deleteStudentLogicallyById(id);
    if (deleteResponse.success) {
      return res.success(200, `Student with id ${id} was deleted logically successfully`, deleteResponse.data);
    } else {
      const error = Error(deleteResponse.message);
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
}
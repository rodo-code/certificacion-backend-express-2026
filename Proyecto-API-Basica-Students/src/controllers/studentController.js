import {
  getAllStudents,
  createStudent,
  getStudentById,
  replaceStudentById,
  getFilteredStudents,
  updateStudentById,
  deleteStudentLogicallyById,
  deleteStudentPhysicallyById
} from "../services/studentService.js";

import { validateStudentBody } from "../utils/studentValidator.js";

export function findStudents(req, res, next) {
  const { pass, site } = req.query;

  if (pass === undefined && site === undefined) {
    return res.success(200,"Get all students",getAllStudents());
  }

  if (pass !== undefined && pass !== "true" && pass !== "false") {
    const error = Error("Query parameter 'pass' must be 'true' or 'false'");
    error.statusCode = 400;
    return next(error);
  }

  if (site !== undefined && site !== "LP" && site !== "CB" && site !== "SC"){
    const error = Error("Query parameter 'site' must be 'LP' or 'CB' or 'SC'");
    error.statusCode = 400;
    return next(error);
  }

  return res.success(200,`Filtered students by pass = ${pass} and site = ${site}`,getFilteredStudents(pass,site));
}

export function saveStudent(req, res, next) {

  const studentValidator = validateStudentBody(req.body,true,true);

  if(!studentValidator.validation){
    const error = Error(studentValidator.message);
    error.statusCode = 400;
    return next(error);
  }
  
  const newStudent = createStudent({
    id: Number(req.body.id),
    name: req.body.name,
    grade: req.body.grade,
    site: req.body.site,
    active: req.body.active
  });
  return res.success(201,"Student created succesfully", newStudent);
}

export function findStudentById(req, res, next) {
  const id = Number(req.params.id);

  console.log(`Retrieving information for student with id ${id}.`);

  if (!Number.isInteger(id) || id < 0) {
    const error = Error("Id must be a valid positive integer");
    error.statusCode = 400;
    return next(error);
  }

  const student = getStudentById(id);

  if (!student) {
    const error = Error("Student not found");
    error.statusCode = 404;
    return next(error);
  }

  return res.success(200,`Student with id ${id} succesfully retrieved`,student);
}

export function replaceStudent(req, res, next){

  const studentValidator = validateStudentBody(req.body,true,true);

  if(!studentValidator.validation){
    const error = Error(studentValidator.message);
    error.statusCode = 400;
    return next(error);
  }

  const studentId = req.body.id;
  const newStudent = {
    id: Number(req.body.id),
    name: req.body.name,
    grade: req.body.grade,
    site: req.body.site,
    active: req.body.active
  };
  const success = replaceStudentById(studentId, newStudent);
  if(success){
    return res.success(200,`Student with id ${studentId} succesfully totally updated`,newStudent);
  }
  else{
    const error = Error(`Student with id ${studentId} in body was not found`);
    error.statusCode = 404;
    return next(error);
  }
}

export function updateStudent(req, res, next){
  const studentValidator = validateStudentBody(req.body,false,false);
  if(!studentValidator.validation){
    const error = Error(studentValidator.message);
    error.statusCode = 400;
    return next(error);
  }
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 0) {
    const error = Error("Id must be a valid positive integer");
    error.statusCode = 400;
    return next(error);
  }
  const updateStudentResponse = updateStudentById(id,req.body);
  if(updateStudentResponse.success){
    return res.success(200, `Student with id ${id} was updated succesfully`, updateStudentResponse.data);
  }
  else{
    const error = Error(updateStudentResponse.message);
    error.statusCode = 404;
    return next(error);
  }
}

export function deleteStudent(req, res, next){
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 0) {
    const error = Error("Id must be a valid positive integer");
    error.statusCode = 400;
    return next(error);
  }
    // const deleteStudentReponse = deleteStudentLogicallyById(id);
  const deleteStudentResponse = deleteStudentPhysicallyById(id);
  if(deleteStudentReponse.success){
    return res.success(200, `Student with id ${id} was deleted succesfully`, deleteStudentReponse.data);
  }
  else{
    const error = Error(deleteStudentReponse.message);
    error.statusCode = 404;
    return next(error);
  }
}
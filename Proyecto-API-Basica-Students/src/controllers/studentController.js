import {
  getAllStudents,
  getStudentsByPassStatus,
  createStudent,
  getStudentByPosition,
} from "../services/studentService.js";
//punto 2 modificado
export function findStudents(req, res, next) {
  const { site, pass } = req.query;

  if (pass === undefined) {
    return res.success(200,"Get all students",getAllStudents());
  }
  if (site === undefined) {
    return res.success(200, "Student list", getAllStudents());
  }
   if (site !== "LP" && site !== "CB" && site !== "SC") {
    const error = Error("Query param 'site' must be 'LP', 'CB' or 'SC'");
    error.statusCode = 400;
    return next(error);
  }
  if (pass !== "true" && pass !== "false") {
    const error = Error("Query parameter 'pass' must be 'true' or 'false'");
    error.statusCode = 400;
    return next(error);
  }

  const passAsBoolean = pass === "true";

  const filteredStudents = getAllStudents().filter(
    (student) => student.site === site
  );
  return res.success(200,`Get students that has pass equals to ${passAsBoolean}`,getStudentsByPassStatus(passAsBoolean));
}

//punto 1 modificado
export function saveStudent(req, res, next) {
  const {id, name, grade, site, active } = req.body;
  if(!Number.isInteger(id)) {
  const error = Error("Field 'id' must be an integer");
  error.statusCode = 400;
  return next(error);
  } 
  if(typeof name !== "string"){
    const error = Error("Field 'name' must be a string");
    error.statusCode = 400;
    return next(error);
  }
  if(grade<0 || grade > 100){
    const error = Error("Field 'grade' must be a number between 0 and 100");
    error.statusCode = 400;
    return next(error);
  }
  if(site !== "LP" || site !== "CB" || site !== "SC"){
    const error = Error("Field 'site' must be 'LP', 'CB' or 'SC'");
    error.statusCode = 400;
    return next(error);
  }
  if(active < 0 || active > 1){
    const error = Error("Field 'active' must be 0 or 1");
    error.statusCode = 400;
    return next(error);
  }

  if (!name || grade === undefined) {
    const error = Error("Fields 'name' and 'grade' are required");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    const error = Error("Field 'name' must be a non-empty string");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof grade !== "number" || grade < 0 || grade > 100) {
    const error = Error("Field 'grade' must be a number between 0 and 100");
    error.statusCode = 400;
    return next(error);
  }

  const newStudent = createStudent({
    name: name.trim(),
    grade,
  });

  return res.success(201,"Student created succesfully", newStudent);
}

export function findStudentByPosition(req, res, next) {
  const position = Number(req.params.pos);

  console.log(`Retrieving information for student in position ${position}.`);

  if (!Number.isInteger(position) || position < 0) {
    const error = Error("Position must be a valid positive integer");
    error.statusCode = 400;
    return next(error);
  }

  const student = getStudentByPosition(position);

  if (!student) {
    const error = Error("Student not found");
    error.statusCode = 404;
    return next(error);
  }

  return res.success(200,`Student in pos ${position} succesfully retrieved`,student);
}
//punto 3 modificado 
export function findStudentById(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    const error = Error("ID must be a valid integer");
    error.statusCode = 400;
    return next(error);
  }
  const student = getStudentById(id);
  if (!student) {
    const error = Error("Student not found");
    error.statusCode = 404;
    return next(error);
  }
  return res.success(200, "Student found", student);
}
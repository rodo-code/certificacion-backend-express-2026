import {
  getAllStudents,
  getStudentsByPassStatus,
  createStudent,
  getStudentByPosition,
} from "../services/studentService.js";

export function findStudents(req, res) {
  const { pass } = req.query;

  if (pass === undefined) {
    return res.status(200).json({
      students: getAllStudents(),
    });
  }

  if (pass !== "true" && pass !== "false") {
    return res.status(400).json({
      error: "Query parameter 'pass' must be 'true' or 'false'",
    });
  }

  const passAsBoolean = pass === "true";

  return res.status(200).json({
    students: getStudentsByPassStatus(passAsBoolean),
  });
}

export function saveStudent(req, res) {
  const { name, grade } = req.body;

  if (!name || grade === undefined) {
    return res.status(400).json({
      error: "Fields 'name' and 'grade' are required",
    });
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      error: "Field 'name' must be a non-empty string",
    });
  }

  if (typeof grade !== "number" || grade < 0 || grade > 100) {
    return res.status(400).json({
      error: "Field 'grade' must be a number between 0 and 100",
    });
  }

  const newStudent = createStudent({
    name: name.trim(),
    grade,
  });

  return res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
}

export function findStudentByPosition(req, res) {
  const position = Number(req.params.pos);

  console.log(`Retrieving information for student in position ${position}.`);

  if (!Number.isInteger(position) || position < 0) {
    return res.status(400).json({
      error: "Position must be a valid positive integer",
    });
  }

  const student = getStudentByPosition(position);

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  return res.status(200).json({
    student,
  });
}
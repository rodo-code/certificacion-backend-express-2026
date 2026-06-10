import { studentList, Student } from "../data/students.js";
export function getAllStudents() {
    // Only active students
    return studentList.filter(student => student.active);
}

export function getFilteredStudents(pass, site) {
    let filteredStudentList = getAllStudents();
    if (pass !== undefined) {
        let passAsBoolean = pass === "true";
        filteredStudentList = filteredStudentList.filter((student) => {
            const hasPassed = student.grade >= 60;
            return hasPassed === passAsBoolean;
        });
    }
    if (site !== undefined) {
        filteredStudentList = filteredStudentList.filter((student) => {
            return student.site === site;
        });
    }
    return filteredStudentList;
}

export function paginateStudentList(studentList, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return studentList.slice(startIndex, endIndex);
}

export function sortStudentsByField(studentList, sortBy, order) {
    if (order === 'asc') {
        return studentList.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);
    }
    if (order === 'desc') {
        return studentList.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1);
    }
    return studentList;
}

export async function createStudent(student) {
    const createdStudent = await Student.create(student);
    return createdStudent;
}

export function getStudentById(id) {
    const foundStudents = studentList.filter(student => student.id === id);
    if (foundStudents.length == 0) {
        return null;
    }
    else {
        return foundStudents[0];
    }
}

export function replaceStudentById(studentId, student) {
    let pos = -1;
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].id == studentId) {
            pos = i;
            break;
        }
    }
    studentList[pos] = student;
    return pos != -1;
}

export function updateStudentById(studentId, body) {
    let pos = -1;
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].id == studentId) {
            pos = i;
            break;
        }
    }
    if (pos == -1) {
        return {
            success: false,
            message: `Not found student with id ${studentId} to update`
        };
    }
    let newStudentInfo = {
        id: studentId,
        name: body.name ?? studentList[pos].name,
        site: body.site ?? studentList[pos].site,
        grade: body.grade ?? studentList[pos].grade,
        active: body.active ?? studentList[pos].active
    };
    studentList[pos] = newStudentInfo;
    return {
        success: true,
        data: newStudentInfo
    };
}

export function deleteStudentLogicallyById(studentId) {
    let pos = -1;
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].id == studentId) {
            pos = i;
            break;
        }
    }
    if (pos == -1) {
        return {
            success: false,
            message: `Not found student with id ${studentId} to update`
        };
    }
    studentList[pos].active = 0;
    return {
        success: true,
        data: studentList[pos]
    };
}

import { Student } from "../data/students.js";
export async function getFilteredStudentsFromDB(filters) {
    const { pass, site, page, limit, sortBy, order } = filters;

    let query = { active: true };

    if (site !== undefined) {
        query.site = site;
    }
    if (pass !== undefined) {
        if (pass === "true") {
            query.grade = { $gte: 60 };
        } else if (pass === "false") {
            query.grade = { $lt: 60 };
        }
    }

    let mongooseQuery = Student.find(query);

    if (sortBy && order) {
        const sortOrder = order === "desc" ? -1 : 1;
        mongooseQuery = mongooseQuery.sort({ [sortBy]: sortOrder });
    }

    if (page && limit) {
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 1;
        const skipRows = (pageNumber - 1) * limitNumber;

        mongooseQuery = mongooseQuery.skip(skipRows).limit(limitNumber);
    }

    return await mongooseQuery;
}

export async function createStudent(studentData) {
    // Nos aseguramos de castear el active a un Booleano nativo
    const isActive = studentData.active === true || studentData.active === 1;

    const newStudent = await Student.create({
        name: studentData.name.trim(),
        grade: Number(studentData.grade),
        site: studentData.site,
        active: isActive
    });
    return newStudent;
}
export async function getStudentById(id) {
    return await Student.findOne({ _id: id, active: true });
}

export async function replaceStudentById(id, studentData) {
    const isActive = studentData.active === true || studentData.active === 1;

    const updatedStudent = await Student.findOneAndReplace(
        { _id: id },
        {
            name: studentData.name.trim(),
            grade: Number(studentData.grade),
            site: studentData.site,
            active: isActive
        },
        { new: true }
    );
    return updatedStudent;
}

export async function updateStudentById(id, body) {
    let updateFields = {};
    if (body.name !== undefined) updateFields.name = body.name.trim();
    if (body.grade !== undefined) updateFields.grade = Number(body.grade);
    if (body.site !== undefined) updateFields.site = body.site;
    if (body.active !== undefined) updateFields.active = (body.active === true || body.active === 1);

    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
    );

    if (!updatedStudent) {
        return { success: false, message: `Student with id ${id} not found to update` };
    }
    return { success: true, data: updatedStudent };
}

export async function deleteStudentLogicallyById(id) {
    const deletedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { active: false } },
        { new: true }
    );

    if (!deletedStudent) {
        return { success: false, message: `Student with id ${id} not found to delete` };
    }
    return { success: true, data: deletedStudent };
}
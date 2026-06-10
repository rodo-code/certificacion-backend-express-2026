import { studentList, Student } from "../data/students.js";

export async function getFilteredStudents({ pass, site, sortBy, order, page, limit }) {
    const filter = {};

    if (pass !== undefined) {
        if (pass === "true") {
            filter.grade = { $gte: 60 };
        } else {
            filter.grade = { $lt: 60 };
        }
    }

    if (site !== undefined) {
        filter.site = site;
    }

    let query = Student.find(filter);

    if (sortBy !== undefined && order !== undefined) {
        const sortOrder = order === "asc" ? 1 : -1;
        query = query.sort({ [sortBy]: sortOrder });
    }

    if (page !== undefined && limit !== undefined) {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        query = query.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    return await query;
}

export async function createStudent(student){
    const createdStudent = await Student.create(student);
    return createdStudent;
}

export function getStudentById(id){
    const foundStudents = studentList.filter ( student => student.id === id);
    if(foundStudents.length == 0){
        return null;
    }
    else{
        return foundStudents[0];
    }
}

export function replaceStudentById(studentId, student){
    let pos = -1;
    for(let i=0;i<studentList.length;i++){
        if(studentList[i].id == studentId){
            pos = i;
            break;
        }
    }
    studentList[pos] = student;
    return pos != -1;
}

export function updateStudentById(studentId,body){
    let pos = -1;
    for(let i=0;i<studentList.length;i++){
        if(studentList[i].id == studentId){
            pos = i;
            break;
        }
    }
    if(pos == -1){
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

export function deleteStudentLogicallyById(studentId){
    let pos = -1;
    for(let i=0;i<studentList.length;i++){
        if(studentList[i].id == studentId){
            pos = i;
            break;
        }
    }
    if(pos == -1){
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
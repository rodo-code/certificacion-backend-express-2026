import { studentList, Student } from "../data/students.js";

export function getAllStudents(){
    return studentList.filter(student => student.active);
}

export async function getFilteredStudents(pass, site, page, limit, sortBy, order){
    const query = { active: true };

    if(pass !== undefined){
        query.grade = pass === "true" ? { $gte: 60 } : { $lt: 60 };
    }

    if(site !== undefined){
        query.site = site;
    }

    let mongoQuery = Student.find(query);

    if(sortBy !== undefined && order !== undefined){
        const sortOrder = order === "desc" ? -1 : 1;
        mongoQuery = mongoQuery.sort({ [sortBy]: sortOrder });
    }

    if(page !== undefined && limit !== undefined){
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        mongoQuery = mongoQuery.skip(skip).limit(limitNumber);
    }

    return await mongoQuery.lean();
}

export function paginateStudentList(studentList, page, limit){
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return studentList.slice(startIndex, endIndex);
}

export function sortStudentsByField(studentList, sortBy, order){
    if(order === 'asc'){
        return studentList.sort((a,b) => a[sortBy] > b[sortBy] ? 1 : -1);
    }
    if(order === 'desc'){
        return studentList.sort((a,b) => a[sortBy] < b[sortBy] ? 1 : -1);
    }
    return studentList;
}

export function createStudent(student){
    const nextId = studentList.length > 0 ? Math.max(...studentList.map(s => s.id)) + 1 : 1;
    const newStudent = { id: nextId, ...student };
    studentList.push(newStudent);
    return newStudent;
}

export function getStudentById(id){
    const foundStudents = studentList.filter(student => student.id === id);
    if(foundStudents.length == 0){
        return null;
    }
    return foundStudents[0];
}

export function replaceStudentById(studentId, student){
    let pos = -1;
    for(let i=0;i<studentList.length;i++){
        if(studentList[i].id == studentId){
            pos = i;
            break;
        }
    }
    if(pos === -1) return false;
    studentList[pos] = student;
    return true;
}

export function updateStudentById(studentId, body){
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
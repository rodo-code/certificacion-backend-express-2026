import { studentList, Student } from "../data/students.js";

export function getAllStudents(){
    return studentList.filter ( student => student.active);
}

export async function getFilteredStudents(pass, site, sortBy, order, page, limit){
    const filter = { active: true };

    if(pass !== undefined){
        const passAsBoolean = pass === "true";
        filter.grade = passAsBoolean ? { $gte: 60 } : { $lt: 60 };
    }

    if(site !== undefined){
        filter.site = site;
    }

    let query = Student.find(filter);

    if(sortBy !== undefined && order !== undefined){
        const sortOrder = order === 'desc' ? -1 : 1;
        query = query.sort({ [sortBy]: sortOrder });
    }

    if(page !== undefined && limit !== undefined){
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        query = query.skip((pageNumber - 1) * limitNumber).limit(limitNumber);
    }

    return await query.exec();
}

export function paginateStudentList(studentList, page, limit){
    const startIndex = (page - 1)*limit;
    const endIndex = page*limit;
    return studentList.slice(startIndex, endIndex);
}

export function sortStudentsByField(studentList, sortBy, order){
    if(order === 'asc'){
        return studentList.sort((a,b) => a[sortBy]>b[sortBy] ? 1 : -1);
    }
    if(order === 'desc'){
        return studentList.sort((a,b) => a[sortBy]<b[sortBy] ? 1 : -1);
    }
    return studentList;
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
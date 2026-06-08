import { studentList } from "../data/students.js";

export function getAllStudents(){
    // Only active students
    return studentList.filter ( student => student.active);
}

export function getFilteredStudents(pass,site){
    let filteredStudentList = getAllStudents();
    if(pass !== undefined){
        let passAsBoolean = pass === "true";
        filteredStudentList = filteredStudentList.filter( (student) => {
            const hasPassed = student.grade >= 60;
            return hasPassed === passAsBoolean;
        });
    }
    if(site !== undefined){
        filteredStudentList = filteredStudentList.filter( (student) => {
            return student.site === site;
        });
    }
    return filteredStudentList;
}

export function createStudent(student){
    studentList.push(student);
    return student;
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

export function deleteStudentById(studentId){
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
            message: `Not found student with id ${studentId} to delete`
        };
    }
    const removed = studentList.splice(pos,1)[0];
    return {
        success: true,
        data: removed
    };
}
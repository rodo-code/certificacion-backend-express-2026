import { studentList, Student } from "../data/students.js";

export async function getAllStudents(){
    // Only active students
    return await Student.find({ active: true });
}

export async function getFilteredStudents(pass, site, page, limit, sortBy, order){
    // Build the query filter
    const filter = { active: true };
    
    if(pass !== undefined){
        let passAsBoolean = pass === "true";
        const gradeThreshold = passAsBoolean ? 60 : { $lt: 60 };
        filter.grade = passAsBoolean ? { $gte: 60 } : { $lt: 60 };
    }
    
    if(site !== undefined){
        filter.site = site;
    }
    
    // Build the query
    let query = Student.find(filter);
    
    // Apply sorting if provided
    if(sortBy !== undefined && order !== undefined){
        const sortObject = {};
        sortObject[sortBy] = order === 'asc' ? 1 : -1;
        query = query.sort(sortObject);
    }
    
    // Apply pagination if provided
    if(page !== undefined && limit !== undefined){
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
    }
    
    return await query.exec();
}

export async function createStudent(student){
    const createdStudent = await Student.create(student);
    return createdStudent;
}

export async function paginateStudentList(studentList, page, limit){
    // This function is now handled in getFilteredStudents with MongoDB
    // Keeping for compatibility, but not used
    const startIndex = (page - 1)*limit;
    const endIndex = page*limit;
    return studentList.slice(startIndex, endIndex);
}

export async function sortStudentsByField(studentList, sortBy, order){
    // This function is now handled in getFilteredStudents with MongoDB
    // Keeping for compatibility, but not used
    if(order === 'asc'){
        return studentList.sort((a,b) => a[sortBy]>b[sortBy] ? 1 : -1);
    }
    if(order === 'desc'){
        return studentList.sort((a,b) => a[sortBy]<b[sortBy] ? 1 : -1);
    }
    return studentList;
}

export async function getStudentById(id){
    const student = await Student.findById(id);
    return student || null;
}

export async function replaceStudentById(studentId, student){
    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId, student, { new: true });
        return updatedStudent !== null;
    } catch (error) {
        return false;
    }
}

export async function updateStudentById(studentId, body){
    try {
        const student = await Student.findById(studentId);
        
        if (!student) {
            return {
                success: false,
                message: `Not found student with id ${studentId} to update`
            };
        }
        
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            {
                name: body.name ?? student.name,
                site: body.site ?? student.site,
                grade: body.grade ?? student.grade,
                active: body.active ?? student.active
            },
            { new: true }
        );
        
        return {
            success: true,
            data: updatedStudent
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

export async function deleteStudentLogicallyById(studentId){
    try {
        const student = await Student.findById(studentId);
        
        if (!student) {
            return {
                success: false,
                message: `Not found student with id ${studentId} to update`
            };
        }
        
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { active: false },
            { new: true }
        );
        
        return {
            success: true,
            data: updatedStudent
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
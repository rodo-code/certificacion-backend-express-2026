let studentList = [
    {
        name: "Matias Meneses",
        grade: 78
    },
    {
        name: "Wendy Caceres",
        grade: 83
    },
    {
        name: "Daner Tonconi",
        grade: 49
    }
];

export const getStudents = (pass) => {
    if (pass) {
        const passBool = pass == 'true' ? true : false;
        return studentList.filter(student => (student.grade >= 60) == passBool);
    }
    return studentList;
};

export const addStudent = (body) => {
    studentList.push(body);
    return body;
};

export const getStudentByPos = (pos) => {
    if (pos >= 0 && pos < studentList.length) {
        return studentList[pos];
    }
    return null;
};
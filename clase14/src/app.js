import express from "express";
import { getStudents, addStudent, getStudentByPos } from "./studentService.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello from Express</h1>");
});

app.get("/api/student", (req, res) => {
    const students = getStudents(req.query.pass);
    res.status(200).json(students);
});

app.post("/api/student", (req, res) => {
    const body = req.body;
    if (body.hasOwnProperty("name") && body.hasOwnProperty("grade")) {
        addStudent(body);
        res.status(201).json({ student: body });
    } else {
        res.status(400).json({ error: "Body not supported" });
    }
});

app.get("/api/student/:pos", (req, res) => {
    const pos = req.params.pos;
    console.log(`Retrieving information for student in ${pos}.`);

    const student = getStudentByPos(pos);

    if (student) {
        res.status(200).json({ student });
    } else {
        res.status(404).json({ error: "Student not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
import mongoose from "mongoose";

export const studentList = [];

const studentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  site: String,
  active: Boolean
});

export const Student = mongoose.model("Student", studentSchema);

export async function seedStudents() {
  const count = await Student.countDocuments();
  if (count >= 5) return;

  await Student.insertMany([
    { name: "Ana Perez",        grade: 85, site: "LP", active: true  },
    { name: "Carlos Mamani",    grade: 45, site: "CB", active: true  },
    { name: "Laura Quispe",     grade: 72, site: "SC", active: true  },
    { name: "Jose Flores",      grade: 38, site: "LP", active: true  },
    { name: "Maria Condori",    grade: 91, site: "CB", active: true  },
    { name: "Pedro Gutierrez",  grade: 55, site: "SC", active: false },
    { name: "Sofia Vargas",     grade: 67, site: "LP", active: true  },
    { name: "Luis Rojas",       grade: 20, site: "CB", active: true  },
  ]);
  console.log("Datos de prueba insertados correctamente");
}

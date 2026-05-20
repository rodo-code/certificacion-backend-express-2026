let agruparPorEstadoAcademico = function(estudiantes) {
  const estudiantesConPromedio = estudiantes.map(est => {
    const suma = est.notas.reduce((acc, nota) => acc + nota, 0);
    const promedio = suma / est.notas.length;
    return { nombre: est.nombre, promedio };
  });

  return estudiantesConPromedio.reduce((acumulador, est) => {
    let categoria;
    if (est.promedio >= 90) {
      categoria = "excelente";
    } else if (est.promedio >= 60) {
      categoria = "aprobado";
    } else {
      categoria = "reprobado";
    }

    if (!acumulador[categoria]) {
      acumulador[categoria] = [];
    }

    acumulador[categoria].push(est);
    return acumulador;
  }, {});
};

const estudiantes = [
  { nombre: "Ana", notas: [95, 90, 100] },
  { nombre: "Luis", notas: [50, 60, 55] },
  { nombre: "Carla", notas: [70, 80, 75] },
  { nombre: "Pedro", notas: [40, 45, 50] }
];

console.log(agruparPorEstadoAcademico(estudiantes));

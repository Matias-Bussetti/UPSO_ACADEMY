const {
  crearUsuario,
  crearEstudiante,
  generarID,
} = require("./../utils/utils");

/*
console.log(
  crearEstudiante(
    "nombreuser",
    "password",
    "nombre",
    "apellido",
    "estudiante",
    "a@a",
    2,
    "Argentina",
    "12"
  )
);
*/
// test("Crear Estudiante Falla", () => {
//   expect(
//     crearEstudiante(
//       "nombreuser",
//       "password",
//       "nombre",
//       "apellido",
//       "estudiante",
//       "a@a",
//       2,
//       "Argentina",
//       "12"
//     )
//   ).toMatchObject({
//     usuario: "nombreuser",
//     password: "password",
//     nombre: "nombre",
//     apellido: "apellido",
//     rol: "estudiante",
//     email: "a@a",
//     edad: 2,
//     paisNac: "Argentina",
//     codCuatrimIni: "12",
//   });
// });

// test("Crear Usuario", () => {
//   expect(crearUsuario(2, 2, 2, 2, 2, 2)).toMatchObject({
//     usuario: "2",
//     password: "2",
//     nombre: "2",
//     apellido: "2",
//     rol: "2",
//     email: "2",
//   });
// });

test("test toMatchObject", () => {
  expect({ a: 1 }).toMatchObject({ a: 1 });
});

const testId = () => {
  const ids = [];
  for (let index = 0; index < 100000; index++) {
    let id = generarID();
    if (ids.includes(id)) {
      return true;
    } else {
      ids.push(id);
    }
  }
  return false;
};

test("test getId", () => {
  expect(testId()).toBe(false);
});

import React, { useEffect, useState } from "react";

const Home = () => {
  const [contador, setContador] = useState(0);
  const [totalHojas, setTotalHojas] = useState(0);
  const [simpleFaz, setSimpleFaz] = useState(0);
  const [simpleFazColor, setSimpleFazColor] = useState(0);
  const [dobleFaz, setDobleFaz] = useState(0);
  const [dobleFazColor, setDobleFazColor] = useState(0);
  const [elementos, setElementos] = useState([]);
  const [nuevoElemento, setNuevoElemento] = useState("");
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [checkboxesColor, setCheckboxesColor] = useState({});
  const [checkboxesSimpleFaz, setCheckboxesSimpleFaz] = useState({});
  const [precios, setPrecios] = useState(null);
  const [simpleFazPrecio, setSimpleFazPrecio] = useState(0);
  const [dobleFazPrecio, setDobleFazPrecio] = useState(0);
  const [simpleFazColorPrecio, setSimpleFazColorPrecio] = useState(0);
  const [dobleFazColorPrecio, setDobleFazColorPrecio] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [adicional, setAdicional] = useState(0);
  const [totalAdicional, setTotalAdicional] = useState(0);
  const handleInputChange = (e) => {
    setNuevoElemento(e.target.value);
  };

  const handleCheckboxChangeColor = (index) => {
    setCheckboxesColor((prevCheckboxes) => ({
      ...prevCheckboxes,
      [index]: !prevCheckboxes[index],
    }));
  };

  const handleCheckboxChangeSimpleFaz = (index) => {
    setCheckboxesSimpleFaz((prevCheckboxes) => ({
      ...prevCheckboxes,
      [index]: !prevCheckboxes[index],
    }));
  };

  const agregarElemento = () => {
    if (nuevoElemento.trim() !== "") {
      if (editandoIndex !== null) {
        // Editando un elemento existente
        const nuevosElementos = [...elementos];
        nuevosElementos[editandoIndex] = nuevoElemento;
        setElementos(nuevosElementos);
        setEditandoIndex(null);
      } else {
        // Agregando un nuevo elemento
        setElementos([...elementos, nuevoElemento]);
        setContador(contador + 1);
      }
      setNuevoElemento(""); // Limpiar el input después de agregar o editar
    }
  };

  const editarElemento = (index) => {
    setNuevoElemento(elementos[index]);
    setEditandoIndex(index);
    setTotalHojas(0);
  };

  const eliminarElemento = (index) => {
    const nuevosElementos = elementos.filter((_, i) => i !== index);
    setElementos(nuevosElementos);

    // Eliminar los checkboxes correspondientes
    const nuevosCheckboxesColor = { ...checkboxesColor };
    const nuevosCheckboxesSimpleFaz = { ...checkboxesSimpleFaz };
    delete nuevosCheckboxesColor[index];
    delete nuevosCheckboxesSimpleFaz[index];
    setCheckboxesColor(nuevosCheckboxesColor);
    setCheckboxesSimpleFaz(nuevosCheckboxesSimpleFaz);
    setContador(contador - 1);
    setTotalHojas(0);
  };

  const handleInputAditional = (e) => {
    // Obtener el valor del input como cadena y convertirlo a número flotante
    let adicional = parseFloat(e.target.value);

    // Verificar si el valor de adicional es NaN o no es un número válido
    if (isNaN(adicional)) {
      adicional = 0; // Establecer adicional como 0 si es NaN
    }

    // Actualizar el estado 'adicional' con el valor obtenido
    setAdicional(adicional);

    // Calcular el nuevo precio total sumando el total anterior y el adicional
    let precioTotal = totalPrecio + adicional;

    // Verificar si el valor de totalPrecio es NaN o no es un número válido
    if (isNaN(precioTotal)) {
      precioTotal = 0; // Establecer precioTotal como 0 si es NaN
    }

    // Actualizar el estado 'totalAdicional' con el nuevo precio total
    setTotalAdicional(precioTotal);

    // Imprimir en la consola el valor del adicional
    console.log(adicional);
  };

  const calcular = () => {
    console.log("Calculando...");

    // Inicializar variables locales para el cálculo
    let newSimpleFaz = 0;
    let newSimpleFazColor = 0;
    let newDobleFaz = 0;
    let newDobleFazColor = 0;
    let precioSimpleFaz = 0;
    let precioSimpleFazColor = 0;
    let precioDobleFaz = 0;
    let precioDobleFazColor = 0;
    let precioTotal = 0;
    for (let i = 0; i < elementos.length; i++) {
      // Verificar si el checkbox está seleccionado con el índice actual

      let isColor = checkboxesColor[i] || false;
      let isSimpleFaz = checkboxesSimpleFaz[i] || false;
      if (isSimpleFaz) {
        if (isColor) {
          newSimpleFazColor += parseFloat(elementos[i]);
        } else {
          newSimpleFaz += parseFloat(elementos[i]);
        }
      } else {
        if (parseFloat(elementos[i]) % 2 !== 0) {
          let mitad = parseFloat(Math.floor(elementos[i] / 2));
          if (isColor) {
            newDobleFazColor += mitad;
            newSimpleFazColor += 1;
          } else {
            newDobleFaz += mitad;
            newSimpleFaz += 1;
          }
        } else {
          let mitad = parseFloat(Math.floor(elementos[i] / 2));
          if (isColor) {
            newDobleFazColor += mitad;
          } else {
            newDobleFaz += mitad;
          }
        }
      }
    }

    // Actualizar el estado una vez que se hayan calculado todos los valores
    setSimpleFaz(newSimpleFaz);
    setSimpleFazColor(newSimpleFazColor);
    setDobleFaz(newDobleFaz);
    setDobleFazColor(newDobleFazColor);
    setTotalHojas(
      newSimpleFaz + newSimpleFazColor + newDobleFaz + newDobleFazColor
    );

    // Calcular el precio total
    precioSimpleFaz = newSimpleFaz * precios.sfb;
    console.log(precioSimpleFaz);
    precioSimpleFazColor = newSimpleFazColor * precios.sfc;
    precioDobleFaz = newDobleFaz * precios.dfb;
    precioDobleFazColor = newDobleFazColor * precios.dfc;
    precioTotal =
      precioSimpleFaz +
      precioSimpleFazColor +
      precioDobleFaz +
      precioDobleFazColor;
    setSimpleFazPrecio(precioSimpleFaz);
    setSimpleFazColorPrecio(precioSimpleFazColor);
    setDobleFazPrecio(precioDobleFaz);
    setDobleFazColorPrecio(precioDobleFazColor);
    setTotalPrecio(precioTotal);
    if (adicional !== 0 || !isNaN(adicional)) {
      setTotalAdicional(precioTotal + adicional);
    }
  };

  useEffect(() => {
    // Obtener precios guardados del localStorage
    const preciosGuardados = JSON.parse(localStorage.getItem("precios"));
    if (preciosGuardados) {
      setPrecios(preciosGuardados);
    }
  }, []);
  return (
    <main className="flex flex-col text-center z-10 relative  ">
      <div className="flex flex-col gap-4 px-4 pt-4">
        <p className="text-[rgb(19,138,152)] text-xl font-bold">
          Calculadora de precios
        </p>
        <label htmlFor="agregar" className="flex">
          Ingrese cantidad de hojas por archivo
        </label>
        <input
          type="number"
          id="agregar"
          name="agregar"
          value={nuevoElemento}
          onChange={handleInputChange}
          onKeyUp={(e) => e.key === "Enter" && agregarElemento()}
          className="border-2 solid outline-none p-2 rounded-md"
          placeholder="Cantidad de hojas"
        />
        <button
          onClick={agregarElemento}
          className="bg-[rgb(19,138,152)] text-white p-2 rounded-md font-semibold hover:bg-[rgb(36,86,92)]"
        >
          {editandoIndex !== null ? "Guardar" : "Agregar"}
        </button>

        {elementos.length > 0 && (
          <div className="mt-4 overflow-x-auto w-full">
            <table className="table-auto w-full border-collapse ">
              <thead className="">
                <tr className="bg-[rgb(19,138,152)] text-white">
                  <th className=" p-2 rounded-tl-md">
                    Cantidad de Hojas
                  </th>
                  <th className="border border-gray-200 p-2">Color</th>
                  <th className="border border-gray-200 p-2">Simple faz</th>
                  <th className=" p-2 rounded-tr-md">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {elementos.map((elemento, index) => (
                  <tr key={index} className="bg-white border border-gray-200">
                    <td className="border border-gray-200 p-2">{elemento}</td>
                    <td className="border border-gray-200 p-2">
                      <input
                        type="checkbox"
                        id={`color-${index}`}
                        checked={checkboxesColor[index] || false}
                        onChange={() => handleCheckboxChangeColor(index)}
                      />
                    </td>
                    <td className="border  p-2">
                      <input
                        type="checkbox"
                        id={`simpleFaz-${index}`}
                        checked={checkboxesSimpleFaz[index] || false}
                        onChange={() => handleCheckboxChangeSimpleFaz(index)}
                      />
                    </td>
                    <td className=" p-2 flex justify-center">
                      <button
                        onClick={() => editarElemento(index)}
                        className="bg-blue-500 text-white  rounded-md mr-2 hover:bg-blue-700 px-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarElemento(index)}
                        className="bg-red-500 text-white rounded-md hover:bg-red-700 px-2"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {elementos.length !== 0 && (
          <p className="text-start">Cantidad de archivos: {contador}</p>
        )}

        <button
          className="bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-700"
          onClick={() => calcular()}
        >
          Calcular
        </button>

        {totalHojas !== 0 && (
          <div className="flex items-start flex-col gap-y-2 font-sans pb-4">
            <p className=" text-lg font-semibold">
              Total de hojas: {totalHojas}
            </p>
            {simpleFaz !== 0 && (
              <p className="">
                Cantidad de hojas simple faz en{" "}
                <span className=" font-bold">blanco y negro</span>: {simpleFaz}
              </p>
            )}
            {dobleFaz !== 0 && (
              <p className="">
                Cantidad de hojas doble faz en{" "}
                <span className=" font-bold">blanco y negro</span>: {dobleFaz}
              </p>
            )}
            {simpleFazColor !== 0 && (
              <p className="">
                Cantidad de hojas simple faz a{" "}
                <span className="text-red-500 font-bold">color</span>:{" "}
                {simpleFazColor}
              </p>
            )}
            {dobleFazColor !== 0 && (
              <p className="">
                Cantidad de hojas doble faz a{" "}
                <span className="text-red-500 font-bold">color</span>:{" "}
                {dobleFazColor}
              </p>
            )}
            <p className=" text-lg font-semibold">Precios individuales</p>

            {simpleFazPrecio !== 0 && (
              <p className="">
                Precio simple faz{" "}
                <span className=" font-bold">blanco y negro</span>: $
                {simpleFazPrecio}
              </p>
            )}
            {dobleFazPrecio !== 0 && (
              <p className="">
                Precio doble faz{" "}
                <span className=" font-bold">blanco y negro</span>: $
                {dobleFazPrecio}
              </p>
            )}
            {simpleFazColorPrecio !== 0 && (
              <p className="">
                Precio simple faz{" "}
                <span className="text-red-500 font-bold">color</span>: $
                {simpleFazColorPrecio}
              </p>
            )}
            {dobleFazColorPrecio !== 0 && (
              <p className="">
                Precio doble faz{" "}
                <span className="text-red-500 font-bold">color</span>: $
                {dobleFazColorPrecio}
              </p>
            )}

            <div className="mb-4 gap-2 flex flex-col w-full">
              <label htmlFor="adicional" className="text-lg font-semibold flex">
                Precio adicional
              </label>
              <div className="relative flex items-center">
                <span className="absolute bg-[rgb(36,86,92)]  h-full flex items-center px-4 rounded-l-md font-bold text-white">
                  $
                </span>
                <input
                  type="text"
                  placeholder="Precio adicional"
                  value={adicional}
                  onChange={handleInputAditional}
                  className="p-2 pl-14 w-full rounded-md text-black outline-none"
                />
              </div>
            </div>

            <p className=" text-xl font-bold w-full px-auto pt-2">
              Precio total: ${totalPrecio}
            </p>
            {adicional !== 0 && !isNaN(adicional) && (
              <p className=" text-xl font-bold w-full px-auto pt-2">
                Precio total con adicional: ${totalAdicional}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;

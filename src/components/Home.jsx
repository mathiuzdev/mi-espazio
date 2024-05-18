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
  };

  useEffect(() => {
    // Obtener precios guardados del localStorage
    const preciosGuardados = JSON.parse(localStorage.getItem("precios"));
    if (preciosGuardados) {
      setPrecios(preciosGuardados);
    }
  }, []);
  return (
    <main className="flex bg-[rgb(232,246,248)] min-h-screen flex-col text-center">
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
          className="border-2 solid outline-none p-2 rounded-md"
        />
        <button
          onClick={agregarElemento}
          className="bg-[rgb(19,138,152)] text-white p-2 rounded-md font-semibold"
        >
          {editandoIndex !== null ? "Guardar" : "Agregar"}
        </button>

        {elementos.length > 0 && (
          <div className="mt-4 overflow-x-auto w-full">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-[rgb(19,138,152)] text-white">
                  <th className="border border-gray-200 p-2 rounded-tl-md">
                    Cantidad de Hojas
                  </th>
                  <th className="border border-gray-200 p-2">Color</th>
                  <th className="border border-gray-200 p-2">Simple faz</th>
                  <th className="border border-gray-200 p-2 rounded-tr-md">
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
                    <td className="border border-gray-200 p-2">
                      <input
                        type="checkbox"
                        id={`simpleFaz-${index}`}
                        checked={checkboxesSimpleFaz[index] || false}
                        onChange={() => handleCheckboxChangeSimpleFaz(index)}
                      />
                    </td>
                    <td className="border border-gray-200 p-2 flex justify-center">
                      <button
                        onClick={() => editarElemento(index)}
                        className="bg-blue-500 text-white p-1 rounded-md mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarElemento(index)}
                        className="bg-red-500 text-white p-1 rounded-md"
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
              <p className="">Simple faz blanco y negro: {simpleFaz}</p>
            )}
            {dobleFaz !== 0 && (
              <p className="">Doble faz blanco y negro: {dobleFaz}</p>
            )}
            {simpleFazColor !== 0 && (
              <p className="">Simple faz color: {simpleFazColor}</p>
            )}
            {dobleFazColor !== 0 && (
              <p className="">Doble faz color: {dobleFazColor}</p>
            )}

            <p className=" text-lg font-semibold">Precios individuales</p>

            {simpleFazPrecio !== 0 && (
              <p className="">
                Precio simple faz blanco y negro: ${simpleFazPrecio}
              </p>
            )}
            {dobleFazPrecio !== 0 && (
              <p className="">
                Precio doble faz blanco y negro: ${dobleFazPrecio}
              </p>
            )}
            {simpleFazColorPrecio !== 0 && (
              <p className="">
                Precio simple faz color: ${simpleFazColorPrecio}
              </p>
            )}
            {dobleFazColorPrecio !== 0 && (
              <p className="">Precio doble faz color: ${dobleFazColorPrecio}</p>
            )}
            <p className=" text-xl font-bold w-full px-auto pt-2">
              Precio total: ${totalPrecio}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
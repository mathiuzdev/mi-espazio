import { useEffect, useState } from "react";


const Header = () => {
  const [clickMenu, setClickMenu] = useState(false);

    const handleClick = () => {
        setClickMenu(!clickMenu);
    }

    const [sfb, setSfb] = useState("");
    const [dfb, setDfb] = useState("");
    const [sfc, setSfc] = useState("");
    const [dfc, setDfc] = useState("");
  
    const handleSfbChange = (e) => {
      setSfb(e.target.value);
    };
  
    const handleDfbChange = (e) => {
      setDfb(e.target.value);
    };
  
    const handleSfcChange = (e) => {
      setSfc(e.target.value);
    };
  
    const handleDfcChange = (e) => {
      setDfc(e.target.value);
    };
  
    const guardarPrecios = () => {
      // Parsear los valores a números antes de guardar
      const parsedSfb = parseFloat(sfb);
      const parsedDfb = parseFloat(dfb);
      const parsedSfc = parseFloat(sfc);
      const parsedDfc = parseFloat(dfc);
  
      // Guardar precios en localStorage
      localStorage.setItem("precios", JSON.stringify({ sfb: parsedSfb, dfb: parsedDfb, sfc: parsedSfc, dfc: parsedDfc }));
    };

    useEffect(() => {
        // Obtener los precios guardados del localStorage
        const preciosGuardados = JSON.parse(localStorage.getItem("precios"));
        if (preciosGuardados) {
          setSfb(preciosGuardados.sfb || "");
          setDfb(preciosGuardados.dfb || "");
          setSfc(preciosGuardados.sfc || "");
          setDfc(preciosGuardados.dfc || "");
        }
      }, []);
  return (
    <>
    <header className="text-red-500 flex justify-between items-center px-4 py-2 shadow-xl">
        <img src="/img/logo1.jpg" alt="" className="w-26 h-16"/>
        <button className="text-xl text-[rgb(19,138,152)] font-bold" onClick={handleClick}>Precios</button>
    </header>
    {clickMenu && (
        <div className="bg-[rgb(19,138,152)] text-white p-2  font-semibold absolute min-h-screen w-full">
 <div className="max-w-full mx-auto  p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-center font-bold pt-2 text-xl">
        Escriba los precios por unidad
      </h1>

      <div className="mb-4">
        <label htmlFor="sfb">Simple faz blanco y negro</label>
        <div className="relative flex items-center">
          <span className="absolute bg-[rgb(36,86,92)]  h-full flex items-center px-4 rounded-l-md font-bold">$</span>
          <input
            type="text"
            id="sfb"
            value={sfb}
            onChange={handleSfbChange}
            className="p-2 pl-14 w-full rounded-md text-black outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="dfb">Doble faz blanco y negro</label>
        <div className="relative flex items-center">
          <span className="absolute bg-[rgb(36,86,92)]  h-full flex items-center px-4 rounded-l-md font-bold">$</span>
          <input
            type="text"
            id="dfb"
            value={dfb}
            onChange={handleDfbChange}
            className="p-2 pl-14 w-full rounded-md text-black outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="sfc">Simple faz color</label>
        <div className="relative flex items-center">
          <span className="absolute bg-[rgb(36,86,92)]  h-full flex items-center px-4 rounded-l-md font-bold">$</span>
          <input
            type="text"
            id="sfc"
            value={sfc}
            onChange={handleSfcChange}
            className="p-2 pl-14 w-full rounded-md text-black outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="dfc">Doble faz color</label>
        <div className="relative flex items-center">
          <span className="absolute bg-[rgb(36,86,92)]  h-full flex items-center px-4 rounded-l-md font-bold">$</span>
          <input
            type="text"
            id="dfc"
            value={dfc}
            onChange={handleDfcChange}
            className="p-2 pl-14 w-full rounded-md text-black outline-none"
          />
        </div>
      </div>

      <button
        onClick={guardarPrecios}
        className="border-2 py-[8px] w-full rounded-md bg-[rgb(36,86,92)] hover:bg-[rgb(27,62,66)] border-[rgb(36,86,92)] font-semibold"
      >
        Guardar precios
      </button>
    </div>
        </div>
    )}
    </>
  )
}

export default Header
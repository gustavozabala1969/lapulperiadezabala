import { useState } from "react";
import PropuestaGastronomicaForm from "../PropuestaFormulario/PropuestaGastronomicaForm";

import styles from './PropuestaFormContenedor.module.css';

function PropuestaFormContenedor() {

    const [datosFormPropuesta, setDatosFormPropuesta] = useState( 
        {
            fecha : "",
            tipo : "",
            descripcion: "",
            capacidadTotal: "",
            precioMayores: "",
            precioMenores: "",
            capacidadOcupada: "0"
        }
    )

    function manejarCambio(evento) {
        const { name, value } = evento.target;

        if (name === "capacidadTotal" || name === "precioMayores" || name === "precioMenores" || name === "capacidadOcupada") {
            value = parseInt(value);
        }
        setDatosFormPropuesta((datosFormPropuesta) => ({
            ...datosFormPropuesta,
            [name]: value
        }));
    }

    function manejarSubmit(evento) {
        evento.preventDefault();

        //if (!validarFormulario()) {
        //    return;
        //}

        const datos = {
            ...propuesta,
            capacidadTotal: Number(propuesta.capacidadTotal),
            capacidadOcupada: Number(propuesta.capacidadOcupada),
            precioMayores: Number(propuesta.precioMayores),
            precioMenores: Number(propuesta.precioMenores)
        };

        console.log(...propuesta);
        // onGuardar?.(datos);
    }

    function manejarCancelar(e) {
        e.preventDefault();
        console.log("cancelando la operacion");
    }


    return (
        <>
            <div className={styles.encabezado}>
                <h3>Agregar Nueva Opción Gastronómica</h3>
                <p>Complete los datos de la propuesta.</p>
            </div>

            <PropuestaGastronomicaForm
                propuesta={datosFormPropuesta} 
                manejarCambio={manejarCambio} 
                manejarSubmit={manejarSubmit}
                manejarCancelar={manejarCancelar}
            />
        </>
    );
    
}

export default PropuestaFormContenedor;

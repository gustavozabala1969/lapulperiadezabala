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
            capacidadOcupada: "0",
            urlImagen: "",
            destacado: ""
        }
    )

    const [imagenFile, setImagenFile] = useState(null);

    const manejarCambio = (evento) => {
        const { name } = evento.target;
        let { value } = evento.target;

        if (name === "capacidadTotal" || name === "precioMayores" || name === "precioMenores" || name === "capacidadOcupada") {
            value = value === "" ? "" : Number(value);
        }
        setDatosFormPropuesta((datosFormPropuesta) => ({
            ...datosFormPropuesta,
            [name]: value
        }));
    }

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0] ?? null);
    }

    const manejarSubmit = async (evento) => { 
        evento.preventDefault(); 

        // Validamos que el usuario haya seleccionado una imagen // 
        if (!imagenFile) { 
            alert("Por favor, selecciona una imagen para el producto.");
            return; 
        } 
        // --- Lógica para subir la imagen a Imgbb --- // 
        const apiKey = '0117650478003f8dcf13d9058b37b1b7'; 
        // //  ¡Reemplazá esto con tu clave! 
        const formData = new FormData(); 
        formData.append('image', imagenFile);

        try { console.log("Subiendo imagen a Imgbb..."); 
            const respuestaImgbb = 
                await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`,
                    { method: 'POST', body: formData, }
                ); 

            const datosImgbb = await respuestaImgbb.json(); 
            if (datosImgbb.success) { 
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url); // Unimos la URL de la imagen con el resto de los datos del formulario  // 

                // Agregamos la URL obtenida //
                const datosPropuestaCompleto = { 
                    ...datosFormPropuesta,
                    capacidadTotal: Number(datosFormPropuesta.capacidadTotal),
                    capacidadOcupada: Number(datosFormPropuesta.capacidadOcupada),
                    precioMayores: Number(datosFormPropuesta.precioMayores),
                    precioMenores: Number(datosFormPropuesta.precioMenores),
                    urlImagen: datosImgbb.data.url 
                }; 

                // // Por el momento hacemos un console.log //  // 
                console.log('Enviando los siguientes datos COMPLETOS a la API:', datosPropuestaCompleto); // 

            } else { 
                throw new Error('La subida de la imagen a Imgbb falló.');
            } 
        } catch (error) { 
            console.error("Error en el proceso de envío:", error); 
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo."); 
        } 
    }

    const manejarCancelar = (evento) => {
        console.log("cancelando la operacion");
    }


    return (
        <>
            <div className={styles.encabezado}>
                <h3>Agregar Nueva Opción Gastronómica</h3>
                <p>Complete los datos de la propuesta.</p>
            </div>

            <PropuestaGastronomicaForm
                datosPropuesta={datosFormPropuesta} 
                manejarCambio={manejarCambio}
                manejarCambioImagen={manejarCambioImagen} 
                manejarSubmit={manejarSubmit}
                manejarCancelar={manejarCancelar}
            />
        </>
    );
    
}

export default PropuestaFormContenedor;

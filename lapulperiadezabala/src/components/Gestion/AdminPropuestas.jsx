import { useState, useEffect } from 'react';
import { Timestamp } from "firebase/firestore";

import { buscarLogo, convertirFechaInput, convertirFechaFormatoDDMMYYYY } from '../../utils/funciones';
import { crearEvento, readEventos, actualizarEvento } from "../../services/PropuestasService";

import PropuestaFormContenedor from '../../components/PropuestaFormularioContenedor/PropuestaFormContenedor';
import AdminPropuestaListado from '../../components/AdminPropuestaListado/AdminPropuestaListado';
import PropuestaGastronomicaForm from "../PropuestaFormulario/PropuestaGastronomicaForm";

import styles from './AdminPropuestas.module.css';

const estadoInicialPropuesta =
{
    id: "",
    fecha: "",
    tipo: "",
    descripcion: "",
    capacidadTotal: "",
    capacidadOcupada: "",
    precioMayores: "",
    precioMenores: "",
    urlImagen: "",
    observaciones: "",
    destacado: false
};



function AdminPropuestas() {

    const [propuestas, setPropuestas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [datosFormPropuesta, setDatosFormPropuesta] = useState(estadoInicialPropuesta);
    const [propuestaAEditar, setPropuestaAEditar] = useState(null);

    useEffect(() => {

        const cargarEventos = async () => {
            try {
                const datos = await readEventos();
                setPropuestas(datos);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        cargarEventos();
    }, []);

    useEffect(() => {
        if (propuestaAEditar) {
            setDatosFormPropuesta({
                id: propuestaAEditar.id,
                fecha: propuestaAEditar.fecha,
                tipo: propuestaAEditar.tipo ?? "",
                capacidadTotal: propuestaAEditar.capacidadTotal ?? "",
                capacidadOcupada: propuestaAEditar.capacidadOcupada ?? "",
                precioMayores: propuestaAEditar.precioMayores ?? "",
                precioMenores: propuestaAEditar.precioMenores ?? "",
                descripcion: propuestaAEditar.descripcion ?? "",
                urlImagen: propuestaAEditar.urlImagen ?? "",
                observaciones: propuestaAEditar.observaciones ?? "",
                destacado: propuestaAEditar.destacado ?? false
            });
        } else {
            setDatosFormPropuesta(estadoInicialPropuesta);
        }
    }, [propuestaAEditar]);

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

    const manejarEditar = (evento) => {
        console.log("operacion editar");
        console.log(evento);
        setPropuestaAEditar({
            ...evento,
            fecha: convertirFechaInput(evento.fecha)
        });
    };

    const manejarCancelar = (evento) => {
        console.log("cancelando la operacion");
        setPropuestaAEditar(null);
    }

    const manejarSubmit = async (evento) => {
        evento.preventDefault();

        // Validamos que el usuario haya seleccionado una imagen // 
        /*
        if (!imagenFile) { 
            alert("Por favor, selecciona una imagen para el producto.");
            return; 
        } 
        */

        // QUITAMOS imgbb

        /*
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
                const eventoCreado = await crearEvento(datosPropuestaCompleto);

                if (!eventoCreado) {
                    alert("Error. No se ha podido generar el Evento.")
                    return
                }

                setPropuestas((prev) => [...prev, eventoCreado]);
                setDatosFormPropuesta(estadoInicialPropuesta);
                alert("Se ha creado el evento correctamente. Id:"+eventoCreado.id) ;

            } else { 
                throw new Error('La subida de la imagen a Imgbb falló.');
            } 
        } catch (error) { 
            console.error("Error en el proceso de envío:", error); 
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo."); 
        } */


        const urlImagenLogo = buscarLogo(datosFormPropuesta.tipo);
        const fechaTimestamp = Timestamp.fromDate(
            new Date(
                Number(datosFormPropuesta.fecha.substring(0, 4)),
                Number(datosFormPropuesta.fecha.substring(5, 7)) - 1,
                Number(datosFormPropuesta.fecha.substring(8, 10))
            ));
        // Agregamos la URL obtenida //
        const datosPropuestaCompleto = {
            ...datosFormPropuesta,
            capacidadTotal: Number(datosFormPropuesta.capacidadTotal),
            capacidadOcupada: Number(datosFormPropuesta.capacidadOcupada),
            precioMayores: Number(datosFormPropuesta.precioMayores),
            precioMenores: Number(datosFormPropuesta.precioMenores),
            fecha: fechaTimestamp,
            urlImagen: urlImagenLogo,
        };

        // // Por el momento hacemos un console.log //  // 
        console.log('Enviando los siguientes datos COMPLETOS a la API:', datosPropuestaCompleto);
        // 
        try {
            if (propuestaAEditar) {
                const eventoActualizado = await actualizarEvento(datosPropuestaCompleto);

                const fechaFormateada = convertirFechaFormatoDDMMYYYY(fechaTimestamp);
                const eventoActualizadoLista = {
                    ...datosFormPropuesta,
                    fecha: fechaFormateada
                }
                setPropuestas((prev) =>
                    prev.map((propuesta) =>
                        propuesta.id === eventoActualizado.id
                            ? eventoActualizadoLista
                            : propuesta
                    )
                );
                setPropuestaAEditar(null);
                alert("La opcion Gastronomica sea modificado correctamente.");
            } else {
                const eventoCreado = await crearEvento(datosPropuestaCompleto);

                if (!eventoCreado) {
                    alert("Error. No se ha podido generar el Evento.")
                    return
                }

                
                const fechaFormateada = convertirFechaFormatoDDMMYYYY(fechaTimestamp);
                const eventoActualizadoLista = {
                    ...datosFormPropuesta,
                    fecha: fechaFormateada
                }
                setPropuestas((prev) => [...prev, eventoActualizadoLista]);
                setDatosFormPropuesta(estadoInicialPropuesta);
                alert("Se ha creado el evento correctamente. Id:" + eventoCreado.id);
            }
        } catch (error) {
            console.error(error);
            alert("No se pudo actualizar o crear el evento");
        }
    }

    const manejarDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "eventos", id);
            await deleteDoc(docRef);
                setPropuestas(propuestas.filter(evento => evento.id !== id));
            alert("Evento Gastronomico eliminado.");
        }
    }

    const modoEdicion = Boolean(propuestaAEditar);

    return (
        <>
            <section className={styles.seccion}>
                <h4 className={styles.titulo}>Administración de Eventos Gastronómicos</h4>

                <div>

                    {cargando && (
                        <p>Cargando datos .... </p>
                    )}
                    {!cargando && !error === "" && (
                        <p>Error al buscar información de propuestas gastronómicas !! </p>
                    )}
                    {!cargando && error === "" && (
                        <>
                            {mostrarFormulario && (
                                {/* <PropuestaFormContenedor propuesta={propuestaSeleccionada} /> */ }
                            )}
                            <PropuestaGastronomicaForm
                                datosPropuesta={datosFormPropuesta}
                                modoEdicion={modoEdicion}
                                manejarCambio={manejarCambio}
                                manejarCambioImagen={manejarCambioImagen}
                                manejarSubmit={manejarSubmit}
                                manejarCancelar={manejarCancelar}
                            />


                            <AdminPropuestaListado
                                propuestas={propuestas}
                                onEditar={manejarEditar}
                                onEliminar={(propuesta) => {
                                    console.log("Eliminar:", propuesta);
                                    manejarDelete(propuesta.id);
                                }}
                            />
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default AdminPropuestas;
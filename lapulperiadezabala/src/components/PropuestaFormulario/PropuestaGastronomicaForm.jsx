import { useState } from "react";
import styles from './PropuestaGastronomicaForm.module.css';


function obtenerFechaHoy() {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}


function PropuestaGastronomicaForm ( propuesta, manejarCambio, manejarSubmit, manejarCancelar ) {

    const [errores, setErrores] = useState({});

    function validarFormulario() {
        const nuevosErrores = {};

        if (!propuesta.fecha) {
            nuevosErrores.fecha = "Debe ingresar una fecha.";
        } else if (propuesta.fecha <= fechaHoy) {
            nuevosErrores.fecha = "La fecha debe ser posterior a hoy.";
        }

        if (!propuesta.tipo) {
            nuevosErrores.tipo = "Debe seleccionar un tipo de propuesta.";
        }

        if (!propuesta.descripcion.trim()) {
            nuevosErrores.descripcion = "Debe ingresar una descripción.";
        } else if (propuesta.descripcion.length > 30) {
            nuevosErrores.descripcion = "La descripción admite hasta 30 caracteres.";
        }

        const capacidadTotal = Number(propuesta.capacidadTotal);
        const capacidadOcupada = Number(propuesta.capacidadOcupada);

        if (propuesta.capacidadTotal === "") {
            nuevosErrores.capacidadTotal = "Debe ingresar la capacidad total.";
        } else if (
            !Number.isInteger(capacidadTotal) ||
            capacidadTotal < 1 ||
            capacidadTotal > 200
        ) {
            nuevosErrores.capacidadTotal = "Ingrese un valor entre 1 y 200.";
        }

        if (propuesta.precioMayores === "") {
            nuevosErrores.precioMayores = "Debe ingresar el precio para mayores.";
        } else if (
            !/^\d{1,7}$/.test(propuesta.precioMayores)
        ) {
            nuevosErrores.precioMayores = "Ingrese un número de hasta 7 dígitos.";
        }

        if (propuesta.precioMenores === "") {
            nuevosErrores.precioMenores = "Debe ingresar el precio para menores.";
        } else if (
            !/^\d{1,7}$/.test(propuesta.precioMenores)
        ) {
            nuevosErrores.precioMenores = "Ingrese un número de hasta 7 dígitos.";
        }

        if (propuesta.capacidadOcupada === "") {
            nuevosErrores.capacidadOcupada = "Debe ingresar la capacidad ocupada.";
        } else if (
            !Number.isInteger(capacidadOcupada) ||
            capacidadOcupada < 0
        ) {
            nuevosErrores.capacidadOcupada = "Ingrese un número entero igual o mayor a cero.";
        } else if (
            propuesta.capacidadTotal !== "" &&
            capacidadOcupada >= capacidadTotal
        ) {
            nuevosErrores.capacidadOcupada =
                "La capacidad ocupada debe ser menor que la capacidad total.";
        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    }



    return (
        <form className={styles.formulario} onSubmit={manejarSubmit}>

            <div className={styles.campo}>
                <label htmlFor="fecha">Fecha:</label>
                <input name="fecha" type="date" id="fecha"
                    min={obtenerFechaHoy}
                    value={propuesta.fecha}
                    onChange={(e) => manejarCambio(e)}
                    required
                /> 
            </div>

            <div className={styles.campo}>
                <label htmlFor="tipo">Tipo:</label>
                <select name="tipo" id="tipo" 
                    value={propuesta.tipo}
                    onChange={(e) => manejarCambio(e)}
                    requerid
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="ASADO">Asado</option>
                    <option value="CERDO">Cerdo</option>
                    <option value="POLLO">Pollo</option>
                    <option value="PASTAS">Pastas</option>
                </select>
                {errores.tipo && (
                    <span className={styles.error}>{errores.tipo}</span>
                )}
            </div>

            <div className={styles.campo}>
                <label htmlFor="descripcion">
                    Descripción
                </label>
                <input
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    maxLength={30}
                    value={propuesta.descripcion}
                    onChange={(e) => manejarCambio(e)}
                    placeholder="Ej. Asado de campo"
                    required
                />
                <span className={styles.contador}>
                    {propuesta.descripcion}
                </span>
                {errores.descripcion && (
                    <span className={styles.error}>{errores.descripcion}</span>
                )}
            </div>

            <div className={styles.campo}>
                <label htmlFor="capacidadTotal">Capacidad total</label>
                <input
                    id="capacidadTotal"
                    name="capacidadTotal"
                    type="number"
                    min="1"
                    max="200"
                    step="1"
                    value={propuesta.capacidadTotal}
                    onChange={(e) => manejarCambio(e)}
                    required
                />
                {errores.capacidadTotal && (
                    <span className={styles.error}>{errores.capacidadTotal}</span>
                )}
            </div>

            <div className={styles.campo}>
                <label htmlFor="precioMayores">Precio mayores</label>
                <input
                    id="precioMayores"
                    name="precioMayores"
                    type="number"
                    min="0"
                    max="9999999"
                    step="1"
                    value={propuesta.precioMayores}
                    onChange={(e) => manejarCambio(e)}
                    required
                />
                {errores.precioMayores && (
                    <span className={styles.error}>{errores.precioMayores}</span>
                )}
            </div>

            <div className={styles.campo}>
                <label htmlFor="precioMenores">Precio menores</label>
                <input
                    id="precioMenores"
                    name="precioMenores"
                    type="number"
                    min="0"
                    max="9999999"
                    step="1"
                    value={propuesta.precioMenores}
                    onChange={(e) => manejarCambio(e)}
                    required
                />
                {errores.precioMenores && (
                    <span className={styles.error}>{errores.precioMenores}</span>
                )}
            </div>

            <div className={styles.campo}>
                <label htmlFor="capacidadOcupada">Capacidad ocupada</label>
                <input
                    id="capacidadOcupada"
                    name="capacidadOcupada"
                    type="number"
                    min="0"
                    max={propuesta.capacidadTotal ? Number(propuesta.capacidadTotal) - 1 : undefined}
                    step="1"
                    value={propuesta.capacidadOcupada}
                    onChange={(e) => manejarCambio(e)}
                    required
                />
                {errores.capacidadOcupada && (
                    <span className={styles.error}>{errores.capacidadOcupada}</span>
                )}
            </div>

            <div className={styles.acciones}>
                {manejarCancelar && (
                    <button 
                        type="button"
                        className={styles.botonCancelar}
                        onClick={manejarCancelar}
                    >
                        Cancelar
                    </button>
                )}

                <button type="submit" className={styles.botonGuardar}>
                    Guardar propuesta
                </button>
            </div>
        </form>
    )
}

export default PropuestaGastronomicaForm;
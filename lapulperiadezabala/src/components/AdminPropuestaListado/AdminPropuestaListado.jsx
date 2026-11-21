
import styles from './AdminPropuestaListado.module.css';

function AdminPropuestaListado({
    propuestas = [],
    onEditar,
    onEliminar
}) {

    if (propuestas.length === 0) {
        return (
            <div className={styles.vacio}>
                <span className={styles.vacio_icono}>📋</span>
                <p>No hay propuestas gastronómicas cargadas.</p>
            </div>
        );
    }

    const formatoPrecio = (precio) => {
        if (precio === undefined || precio === null || precio === "") {
            return "-";
        }

        return Number(precio).toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        });
    };

    return (
        <section className={styles.contenedor}>

            <div className={styles.encabezado}>
                <h2>Eventos gastronómicos</h2>

                <span className={styles.cantidad}>
                    {propuestas.length} {propuestas.length === 1 ? 'evento' : 'eventos'}
                </span>
            </div>

            <div className={styles.tabla_contenedor}>

                <table className={styles.tabla}>

                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Propuesta</th>
                            <th>Precio adultos</th>
                            <th>Precio menores</th>
                            <th>Capacidad</th>
                            <th>Ocupación</th>
                            <th>Destacado</th>
                            <th className={styles.col_acciones}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {propuestas.map((propuesta) => (

                            <tr key={propuesta.id}>

                                <td className={styles.fecha}>
                                    {propuesta.fecha}
                                </td>

                                <td className={styles.tipo}>
                                    {propuesta.tipo || propuesta.descripcion || "-"}
                                </td>

                                <td>
                                    {formatoPrecio(propuesta.precioMayores)}
                                </td>

                                <td>
                                    {formatoPrecio(propuesta.precioMenores)}
                                </td>

                                <td className={styles.capacidad}>
                                    {propuesta.capacidadTotal ?? "-"}
                                </td>

                                <td>
                                    <div className={styles.ocupacion_contenido}>
                                        <span>
                                            {propuesta.capacidadOcupada ?? 0}
                                            {" / "}
                                            {propuesta.capacidadTotal ?? 0}
                                        </span>

                                        {propuesta.capacidadTotal > 0 && (
                                            <div className={styles.progreso}>
                                                <div
                                                    className={styles.progreso_valor}
                                                    style={{
                                                        width: `${Math.min(
                                                            100,
                                                            (propuesta.capacidadOcupada / propuesta.capacidadTotal) * 100
                                                        )}%`
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td>
                                    {propuesta.destacado ? (
                                        <span className={styles.destacado}>
                                            ★ Destacado
                                        </span>
                                    ) : (
                                        <span className={styles.no_destacado}>
                                            No
                                        </span>
                                    )}
                                </td>

                                <td>
                                    <div className={styles.acciones}>

                                        <button
                                            type="button"
                                            className={styles.boton_editar}
                                            onClick={() => onEditar(propuesta)}
                                            title="Editar evento"
                                            aria-label={`Editar ${propuesta.tipo || propuesta.descripcion || 'evento'}`}
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            type="button"
                                            className={styles.boton_eliminar}
                                            onClick={() => {
                                                if (window.confirm(
                                                    `¿Está seguro de eliminar "${propuesta.tipo || propuesta.descripcion || 'este evento'}"?`
                                                )) {
                                                    onEliminar?.(propuesta);
                                                }
                                            }}
                                            title="Eliminar evento"
                                            aria-label={`Eliminar ${propuesta.tipo || propuesta.descripcion || 'evento'}`}
                                        >
                                            🗑️
                                        </button>

                                    </div>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    );
}

export default AdminPropuestaListado;

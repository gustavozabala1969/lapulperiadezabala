
import styles from './AdminUsuariosListado.module.css';

function AdminUsuariosListado({
    usuarios = []
}) {

    if (usuarios.length === 0) {
        return (
            <div className={styles.vacio}>
                <span className={styles.vacio_icono}>📋</span>
                <p>No hay usuarios cargados.</p>
            </div>
        );
    }


    return (
        <section className={styles.contenedor}>

            <div className={styles.encabezado}>
                <h2>Usuarios</h2>

                <span className={styles.cantidad}>
                    {usuarios.length} {usuarios.length === 1 ? 'usuario' : 'usuarios'}
                </span>
            </div>

            <div className={styles.tabla_contenedor}>

                <table className={styles.tabla}>

                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                        </tr>
                    </thead>

                    <tbody>

                        {usuarios.map((usuario) => (

                            <tr key={usuario.id}>


                                <td className={styles.texto}>
                                    {usuario.usuario || usuario.usuario || "-"}
                                </td>

                                <td className={styles.texto}>
                                    {usuario.email || usuario.email || "-"}
                                </td>

                                <td className={styles.texto}>
                                    {usuario.rol || usuario.rol || "-"}
                                </td>
                                

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    );
}

export default AdminUsuariosListado;

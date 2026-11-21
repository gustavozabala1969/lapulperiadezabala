import styles from './AdminPropuestaListado.module.css'; 

function AdminPropuestaListado ( {propuestas}) {
    if (propuestas.length === 0) {
        return <p>No se propuestas gastronómicas cargadas.</p>;
    }

    return (
        <ul>
            {propuestas.map((propuesta) => (
                <li key={propuesta.id} >
                    <span>{propuesta.fecha}</span>
                    <span>{propuesta.tipo}</span>
                    <span>{propuesta.precioMayores}</span>
                    <span>{propuesta.precioMenores}</span>
                    <span>{propuesta.capacidadTotal}</span>
                    <span>{propuesta.capacidadOcupada}</span>
                    <span>{propuesta.destacado}</span>
                </li>    
            ))}
        </ul>
    );
}

export default AdminPropuestaListado;
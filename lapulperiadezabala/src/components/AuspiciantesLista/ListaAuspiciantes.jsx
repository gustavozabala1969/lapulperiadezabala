import { useEffect, useState } from 'react';

import styles from './ListaAuspiciantes.module.css';
import Auspiciante from '../Auspiciantes/Auspiciante.jsx';

function ListaAuspiciantes() {

    const [auspiciantes, setAuspiciantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    

    useEffect(() => {
        const cargarAuspiciantes = async () => {
            try {
                const response = await fetch('/data/auspiciantes.json');
                if (!response.ok) {
                    throw new Error('Error al cargar los auspiciantes');
                }

                const listaAuspiciantes = await response.json();

                setAuspiciantes(listaAuspiciantes);
            } catch (e) {
                console.error(e);
            } finally {
                setCargando(false);
            }
        }
        cargarAuspiciantes();
    }, []);

    return (
        <section className={styles.seccion}>
            <h4 className={styles.titulo}>Auspiciantes</h4>
            
            <div className={styles.lista}>
                {auspiciantes.map((auspicio) => (
                    <Auspiciante
                        key={auspicio.id}
                        {...auspicio}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListaAuspiciantes;
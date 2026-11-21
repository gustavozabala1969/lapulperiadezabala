import { getDocs, collection, getDoc, updateDoc, doc, query, where, orderBy, Timestamp, setDoc, limit } from 'firebase/firestore';
import { db } from '../firestore/config';

const propuestasDB = collection(db, "eventos");

export const readEventosNuevos = () => {
    
    // Fecha de hoy a las 00:00 hs.
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    {/*        where("fecha", ">=", Timestamp.fromDate(hoy)), */}
    const consulta = query(
        propuestasDB,
        where("destacado", "==", true),
        where("fecha", ">=", Timestamp.fromDate(hoy)),
        orderBy("fecha", "asc")
    );

    return getDocs(consulta).then((resp) => {

            return resp.docs.map((docu) => {
                const datos = docu.data();
                // console.log("Fecha recibida:", datos.fecha);
                return { 
                    ...docu.data(), 
                    id: docu.id,
                    fecha: new Date(datos.fecha.seconds * 1000).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })       
                };
            }) 

    })
}

export const readEventos = () => {
    
    return getDocs(propuestasDB).then((resp) => {

            return resp.docs.map((docu) => {
                const datos = docu.data();
                // console.log("Fecha recibida:", datos.fecha);
                return { 
                    ...docu.data(), 
                    id: docu.id,
                    fecha: new Date(datos.fecha.seconds * 1000).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })       
                };
            }) 

    })
}

export const readEventosVigentes = () => {
    
    // Fecha de hoy a las 00:00 hs.
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    {/*        where("fecha", ">=", Timestamp.fromDate(hoy)), */}
    const consulta = query(
        propuestasDB,
        where("fecha", ">=", Timestamp.fromDate(hoy)),
        orderBy("fecha", "asc")
    );

    return getDocs(consulta).then((resp) => {
            return resp.docs.map((docu) => {
                const datos = docu.data();
                // console.log("Fecha recibida:", datos.fecha);
                return { 
                    ...docu.data(), 
                    id: docu.id,
                    fecha: new Date(datos.fecha.seconds * 1000).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })       
                };
            }) 

    })
}

export const proxIdEvento = async () => {

    const resp = await getDocs(propuestasDB);

    if (resp.empty) {
        return 1;
    }

    const mayorID = resp.docs.reduce((mayor, documento) => {
        const id = Number(documento.id);

        return id > mayor ? id : mayor;
    }, 0);

    return mayorID + 1;
};


export const crearEvento = async (evento) => {
    
    const nuevoID = await proxIdEvento();
    console.log("nuevo ID:"+nuevoID);

    const nuevoEvento = {
        ...evento,
        id: nuevoID
    };

    const eventoRef = doc(db, "eventos", nuevoID.toString());

    const eventoExistente = await getDoc(eventoRef);
    
    if (eventoExistente.exists()) {
        return null;
    }

    await setDoc(eventoRef, nuevoEvento);

    return (nuevoEvento);
}

export const actualizarEvento = async (evento) => {
    
    const { id, ...datosEvento } = evento;
    const idLimpio = id.trim();
    
    const eventoRef = doc(db, "eventos", idLimpio);

    await updateDoc(eventoRef, datosEvento);

    return { ...datosEvento, id: idLimpio};
}



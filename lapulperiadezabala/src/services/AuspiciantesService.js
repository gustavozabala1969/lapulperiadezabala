import { getDocs, collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firestore/config';

const auspiciantesDB = collection(db, "auspiciantes");

export const readAuspiciantes = () => {
    
    return getDocs(auspiciantesDB).then((resp) => {

            return resp.docs.map((docu) => {
                const datos = docu.data();
                return { 
                    ...docu.data(), 
                    id: docu.id
                };
            }) 

    })
}
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firestore/config';

const usuariosDB = collection(db, "usuarios");

export const readUsuarios = () => {
    
    return getDocs(usuariosDB).then((resp) => {

            return resp.docs.map((docu) => {
                const datos = docu.data();
                return { 
                    ...docu.data(), 
                    id: docu.id
                };
            }) 

    })
}
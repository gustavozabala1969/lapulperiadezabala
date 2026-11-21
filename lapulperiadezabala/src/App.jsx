import {Routes, Route} from "react-router-dom";

import { Layout } from './components/Layout/Layout';
import Home from './components/pages/Home/Home';
import Historia from './components/pages/Historia/Historia';
import ListaPropuestas from './components/PropuestaLista/ListaPropuestas';
import ListaAuspiciantes from './components/AuspiciantesLista/ListaAuspiciantes';
import AdminPropuestas from './components/Gestion/AdminPropuestas';
import AdminAuspiciantes from './components/Gestion/AdminAuspiciantes';
import AdminUsuarios from './components/Gestion/AdminUsuarios';

import './App.css'

function App() {

  return (
      <>

        <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/reservas" element={<ListaPropuestas />} />
              <Route path="/historia" element={<Historia />} />
              <Route path="/auspiciantes" element={<ListaAuspiciantes />} />
              {/* <Route path="/admin" element={<PropuestaFormContenedor />} /> */}
              <Route path="/adminEventos" element={<AdminPropuestas />} />
              <Route path="/adminUsuarios" element={<AdminUsuarios />} />
              <Route path="/adminAuspiciantes" element={<AdminAuspiciantes />} />
          </Route>
        </Routes>

      </>
  );
}

export default App

import {Routes, Route} from "react-router-dom";

import { Layout } from './components/Layout/Layout';
import Home from './components/pages/Home/Home';
import Historia from './components/pages/Historia/Historia';
import ListaPropuestas from './components/PropuestaLista/ListaPropuestas';
import ListaAuspiciantes from './components/AuspiciantesLista/ListaAuspiciantes';
import PropuestaFormContenedor from './components/PropuestaFormularioContenedor/PropuestaFormContenedor';

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
              <Route path="/admin" element={<PropuestaFormContenedor />} />
          </Route>
        </Routes>

      </>
  );
}

export default App

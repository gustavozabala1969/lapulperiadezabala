import {Routes, Route} from "react-router-dom";

import { Layout } from './components/Layout/Layout';
import Home from './components/pages/Home/Home';
import Historia from './components/pages/Historia/Historia';
import ListaPropuestas from './components/PropuestaLista/ListaPropuestas';
import PropuestaFormContenedor from './components/PropuestaFormularioContenedor/PropuestaFormContenedor';

import './App.css'

function App() {

  return (
      <>
        <Layout >
            <Home/>
            <ListaPropuestas />
            <PropuestaFormContenedor />
        </Layout>

      {/*  
      <Routes>
        <Route element={<Layout />} >
            <Route path="/" element={Home}></Route>
            <Route path="/inicio" element={Home}></Route>
            <Route path="/reservas" element={ListaPropuestas}></Route>
            <Route path="/historia" element={Historia}></Route>
            <Route path="/admin" element={PropuestaFormContenedor}></Route>
        </Route>
      </Routes>
      */}
        </>
  );
}

export default App

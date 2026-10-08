import { Layout } from './components/Layout/Layout';
import Home from './components/pages/Home/Home';


import './App.css'
import ListaPropuestas from './components/PropuestaLista/ListaPropuestas';
import PropuestaFormContenedor from './components/PropuestaFormularioContenedor/PropuestaFormContenedor';

function App() {

  return (

      <Layout>
            <PropuestaFormContenedor />
            <ListaPropuestas />
            <Home />
      </Layout>

  )
}

export default App

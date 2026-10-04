import { Layout } from './components/Layout/Layout';
import Home from './components/pages/Home/Home';


import './App.css'
import ListaPropuestas from './components/PropuestaLista/ListaPropuestas';

function App() {

  return (

      <Layout>
          <ListaPropuestas />
          <Home />
      </Layout>

  )
}

export default App

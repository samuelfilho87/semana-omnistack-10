import React, { useState, useEffect } from 'react';
import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// Componentes: Um bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicaçãp;
// Propriedade: Informações que um componente pai passa para o componente filiho;
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
   const [devs, setDevs] = useState([]);

   useEffect(() => {
      async function loadDevs() {
         const response = await api.get('/devs');
         
         setDevs(response.data);
      }

      loadDevs();
   }, []); // quando [] carrega somente uma vez

   async function handleAddDev(data) {
      const response = await api.post('/devs', data);

      setDevs([...devs, response.data]);
   }

   return (
      <div id="app">
         <aside>
            <strong>Cadastrar</strong>

            <DevForm onSubmit={handleAddDev} />
         </aside>

         <main>
            <ul>
               {devs.map(dev => (
                  <DevItem key={dev._id} dev={dev} />
               ))}
            </ul>
         </main>
      </div>
   );
}

export default App;

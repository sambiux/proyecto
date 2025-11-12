import React, { useState } from 'react';
import Login from './components/Login';
import CrudUsuarios from './components/CrudUsuarios';

function App() {
  const [logueado, setLogueado] = useState(false);

  return (
    <div>
      {logueado ? (
        <div>
          <button onClick={() => setLogueado(false)}>Cerrar sesión</button>
          <CrudUsuarios />
        </div>
      ) : (
        <Login onLogin={() => setLogueado(true)} />
      )}
    </div>
  );
}

export default App;

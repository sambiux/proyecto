import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CrudUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' });
  const [editId, setEditId] = useState(null);

  function obtenerUsuarios() {
    axios.get('http://localhost:5001/api/usuarios')
      .then(res => setUsuarios(res.data));
  }

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  function guardarUsuario(e) {
    e.preventDefault();
    if (editId) {
      axios.put(`http://localhost:5001/api/usuarios/${editId}`, form)
        .then(() => {
          obtenerUsuarios();
          setForm({ nombre: '', email: '', telefono: '' });
          setEditId(null);
        });
    } else {
      axios.post('http://localhost:5001/api/usuarios', form)
        .then(() => {
          obtenerUsuarios();
          setForm({ nombre: '', email: '', telefono: '' });
        });
    }
  }

  function eliminarUsuario(id) {
    axios.delete(`http://localhost:5001/api/usuarios/${id}`)
      .then(() => obtenerUsuarios());
  }

  function editarUsuario(u) {
    setForm({ nombre: u.nombre, email: u.email, telefono: u.telefono });
    setEditId(u.id);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Usuarios</h2>

      <form onSubmit={guardarUsuario}>
        <input type="text" placeholder="Nombre"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })} />
        <input type="text" placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="text" placeholder="Teléfono"
          value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })} />
        <button type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: '20px' }}>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td>
                <button onClick={() => editarUsuario(u)}>Editar</button>
                <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudUsuarios;

import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  async function obtenerUsuarios() {
    const respuesta = await supabase.from("usuarios").select("*");
    if (respuesta.data) {
      setUsuarios(respuesta.data);
    } else {
      alert("Error al cargar usuarios");
    }
  }

  async function guardarUsuario() {
    if (nombre === "" || email === "") {
      alert("Faltan datos");
      return;
    }

    if (idEditar === null) {
      const insertar = await supabase.from("usuarios").insert([
        { nombre: nombre, email: email, telefono: telefono }
      ]);
      if (insertar.error) {
        alert("Error al guardar");
      } else {
        alert("Usuario agregado");
      }
    } else {
      const actualizar = await supabase
        .from("usuarios")
        .update({ nombre: nombre, email: email, telefono: telefono })
        .eq("id", idEditar);
      if (actualizar.error) {
        alert("Error al actualizar");
      } else {
        alert("Usuario actualizado");
      }
      setIdEditar(null);
    }

    setNombre("");
    setEmail("");
    setTelefono("");
    obtenerUsuarios();
  }

  async function borrarUsuario(id) {
    const borrar = await supabase.from("usuarios").delete().eq("id", id);
    if (borrar.error) {
      alert("Error al eliminar");
    } else {
      alert("Usuario eliminado");
    }
    obtenerUsuarios();
  }

  function editarUsuario(usuario) {
    setIdEditar(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setTelefono(usuario.telefono);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD usuarios </h2>

      <div>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <button onClick={guardarUsuario}>
          {idEditar === null ? "Agregar" : "Actualizar"}
        </button>
      </div>

      <br />
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.telefono}</td>
                <td>
                  <button onClick={() => editarUsuario(u)}>Editar</button>
                  <button onClick={() => borrarUsuario(u.id)}>Borrar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay usuarios disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
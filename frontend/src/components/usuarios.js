import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  // READ
  const getUsuarios = async () => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("fecha_registro", { ascending: false });

    if (!error) setUsuarios(data);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  // CREATE
  const addUsuario = async () => {
    if (!form.nombre || !form.email) return alert("Faltan datos");
    await supabase.from("usuarios").insert([form]);
    setForm({ nombre: "", email: "", telefono: "" });
    getUsuarios();
  };

  // DELETE
  const deleteUsuario = async (id) => {
    await supabase.from("usuarios").delete().eq("id", id);
    getUsuarios();
  };

  return (
    <div style={{ padding: "25px" }}>
      <h2>CRUD Usuarios (Supabase)</h2>

      <div>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Teléfono"
          value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })}
        />
        <button onClick={addUsuario}>Agregar</button>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Nombre</th><th>Email</th><th>Teléfono</th><th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td><button onClick={() => deleteUsuario(u.id)}>elimiar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

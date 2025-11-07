import { useState, useEffect } from "react"
import { supabase } from "./supabase"
import "./App.css"

export default function LoginYUsuarios() {

  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")
  const [user, setUser] = useState(null)
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    // solo para verificar si hay sesión o no
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user)
        mostrarHorarios()
      }
    })
  }, [])

  async function iniciar(e) {
    e.preventDefault()

    let c = correo.trim().toLowerCase()
    let p = clave.trim()

    let { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", c)
      .eq("password", p)
      .maybeSingle()

    if (!data) {
      alert("correo o contraseña mal")
    } else {
      setUser(data)
      mostrarHorarios()
    }
  }

  async function salir() {
    await supabase.auth.signOut()
    setUser(null)
  }

  function mostrarHorarios() {
    // horarios falsos de ejemplo
    setHorarios([
      { dia: "Lunes", materia: "Matemáticas I", hora: "8:00 AM - 10:00 AM" },
      { dia: "Martes", materia: "Programación I", hora: "10:00 AM - 12:00 PM" },
      { dia: "Miércoles", materia: "Inglés", hora: "1:00 PM - 3:00 PM" },
      { dia: "Jueves", materia: "Física", hora: "8:00 AM - 10:00 AM" },
      { dia: "Viernes", materia: "Deportes", hora: "2:00 PM - 4:00 PM" },
    ])
  }

  if (!user) {
    return (
      <div className="login-page">
        <div className="login-info">
          <h2>Bienvenido</h2>
          <p>Por favor escribe tu correo y tu contraseña</p>
        </div>

        <div className="login-form">
          <h3>Iniciar Sesión</h3>
          <form onSubmit={iniciar}>
            <input
              type="email"
              placeholder="correo"
              className="input-field"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              type="password"
              placeholder="contraseña"
              className="input-field"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
            <button className="login-btn">Entrar</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="panel-horarios">
      <div className="encabezado">
        <h2>Hola {user.nombre}</h2>
        <button onClick={salir} className="btn-salir">Cerrar sesión</button>
      </div>

      <h3> Tus horarios de universidad</h3>

      <div className="lista-horarios">
        {horarios.map((h, i) => (
          <div key={i} className="tarjeta-horario">
            <h4>{h.dia}</h4>
            <p><b>Materia:</b> {h.materia}</p>
            <p><b>Hora:</b> {h.hora}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

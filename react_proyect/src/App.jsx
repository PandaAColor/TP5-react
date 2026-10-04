import { useState } from 'react'
import './App.css'
import Lista from './components/Lista'
import Form from './components/Form'
import Componito from './components/Componito'


function App() {
  const [vista, setvista] = useState('lista')
  const [tareaEdicion, setTareaEdicion] = useState(null)

  const guardarTarea = (tarea) => {
    if(tareaEdicion) {
      fetch(`http://localhost:3000/tasks/{tareaEdicion.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tarea)
      })
      .then((res) => res.json())
      .then(() => {
        setTareaEdicion(null)
        setvista('lista')
      });
    } else {
      fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tarea)
      })
      .then((res) => res.json())
      .then(() => setvista('lista'))
    }
  }

  const empezarEdicion = (tarea) => {
    setTareaEdicion(tarea)
    setvista('form')
  }

  return (
  <div>
    <h1>Manejador de Tareas</h1>
    <button onClick={() => {setvista('form'); setTareaEdicion(null);}}>Agregar Tarea</button>
    <button onClick={() => {setvista('lista'); setTareaEdicion(null)}}>Listar Tareas</button>

    {vista === 'lista' ? (
      <Lista onEditar = {empezarEdicion}/>
    ) : (
      <Form tareaInicial = {tareaEdicion} onGuardar = {guardarTarea}/>
    )}
  </div>
);

}

export default App

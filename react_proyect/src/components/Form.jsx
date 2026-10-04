import { useEffect, useState } from 'react'

function Form({tareaInicial, onGuardar}) {
  const [tarea , setTarea] = useState({
    nombre : '',
    actividad : '',
    estado : '',
    resumen : '',
    descripcion : '',
    prioridad : 0,
    informador : '',
    asignado : '',
    precondicion : '',
    fecha_creacion: '',
    fecha_cierre : '',
    sprint : 0
  })

  useEffect(() => {
    if (tareaInicial) {
      setTarea(tareaInicial)
    } else {setTarea({
      nombre : '',
      actividad : '',
      estado : '',
      resumen : '',
      descripcion : '',
      prioridad : 0,
      informador : '',
      asignado : '',
      precondicion : '',
      fecha_creacion: '',
      fecha_cierre : '',
      sprint : 0
    })}
  }, [tareaInicial])

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(tarea);
  }

  const handleInput = (e, campo) => {
  setTarea({ ...tarea, [campo]: e.target.value })
  }


  return (
  <div>
    <h2>Formulario Tarea</h2>

    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='proyecto'>Nombre del Proyecto: </label>
        <input
          type='text'
          id='nombre'
          onChange={(e) => handleInput(e, 'nombre')}
          value = {tarea.nombre}
        />
      </fieldset>
      <fieldset>
        <label htmlFor='actividad'>Tipo de Actividad: </label>
        <input
          type='text'
          id='actividad'
          onChange={(e) => handleInput(e, 'actividad')}
          value = {tarea.actividad}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='estado'>Estado: </label>
        <input
          type='text'
          id='estado'
          onChange={(e) => handleInput(e, 'estado')}
          value = {tarea.estado}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='resumen'>Resumen: </label>
        <input
          type='text'
          id='resumen'
          onChange={(e) => handleInput(e, 'resumen')}
          value = {tarea.resumen}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='descripcion'>Descripcion: </label>
        <input
          type='text'
          id='descripcion'
          onChange={(e) => handleInput(e, 'descripcion')}
          value = {tarea.descripcion}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='prioridad'>Prioridad: </label>
        <input
          type='number'
          id='prioridad'
          onChange={(e) => handleInput(e, 'prioridad')}
          value = {tarea.prioridad}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='informador'>Informador: </label>
        <input
          type='text'
          id='informador'
          onChange={(e) => handleInput(e, 'informador')}
          value = {tarea.informador}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='asignado'>Persona asignada: </label>
        <input
          type='text'
          id='asignado'
          onChange={(e) => handleInput(e, 'asignado')}
          value = {tarea.asignado}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='precondicion'>Precondicion: </label>
        <input
          type='text'
          id='precondicion'
          onChange={(e) => handleInput(e, 'precondicion')}
          value = {tarea.precondicion}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='fecha_creacion'>Fecha de Creación: </label>
        <input
          type='date'
          id='fecha_creacion'
          onChange={(e) => handleInput(e, 'fecha_creacion')}
          value = {tarea.fecha_creacion}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='fecha_cierre'>Fecha de Cierre: </label>
        <input
          type='date'
          id='fecha_cierre'
          onChange={(e) => handleInput(e, 'fecha_cierre')}
          value = {tarea.fecha_cierre}

        />
      </fieldset>
      <fieldset>
        <label htmlFor='sprint'>Sprint: </label>
        <input
          type='number'
          id='sprint'
          onChange={(e) => handleInput(e, 'sprint')}
          value = {tarea.sprint}

        />
      </fieldset>
      <button>{tareaInicial ? 'Guardar cambios' : 'Agregar'}</button>
    </form>
  </div>
);

}

export default Form
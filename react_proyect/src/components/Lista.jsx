import { useState } from 'react';
import { useEffect } from 'react';



function Lista({onEditar}) {
    const [tareas, setTareas] = useState([])
    const [tareaAbierta, setTareaAbierta] = useState(null)

    const cargarTareas = () => {
        fetch('http://localhost:3000/tasks')
        .then((res) => res.json())
        .then(setTareas)
    };

    useEffect(() => {
        cargarTareas()
    }, []);

    const finalizarTarea = (id) => {
        fetch(`http://localhost:3000/tasks/${id}`, {method: 'POST'})
        .then((res) => res.json())
        .then(() => alert('Tarea finalizada'))
    };

    const eliminarTarea = (id) => {
        if (!confirm('¿eliminar tarea?')) return;
        fetch(`http://localhost:3000/tasks/${id}`, {method: 'DELETE'})
            .then((res) => {
                if (!res.ok) throw new Error('no se pudo eliminar')
                    cargarTareas()
            })
            .catch((err) => {
                alert('Error al eliminar: ' + err.message)
                cargarTareas()
            })
    };


    return (
        <div>
            <h2>Lista de tareas</h2>

            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        <strong>{tarea.nombre}, prioridad: {tarea.prioridad}, fecha cierre: {tarea.fecha_cierre}</strong>
                        <button onClick={() => setTareaAbierta(tareaAbierta === tarea.id ? null : tarea.id)}> 
                            {tareaAbierta === tarea.id ? 'Ver menos' : 'Ver más'} 
                            </button>
                            {tareaAbierta === tarea.id && (
                                <ul>
                                    <li>actividad: {tarea.actividad}</li>
                                    <li>estado: {tarea.estado}</li>
                                    <li>resumen: {tarea.resumen}</li>
                                    <li>descripcion: {tarea.descripcion}</li>
                                    <li>informador: {tarea.informador}</li>
                                    <li>asignado: {tarea.asignado}</li>
                                    <li>precondicion: {tarea.precondicion}</li>
                                    <li>creacion: {tarea.fecha_creacion}</li>
                                    <li>sprint: {tarea.sprint} </li> 
                                </ul>
                               
                            )}
                       
                        <button onClick={() => onEditar(tarea)}>Editar</button>
                        <button onClick={() => finalizarTarea(tarea.id)}>Finalizar</button>
                        <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Lista
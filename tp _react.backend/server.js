'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const {Pool} = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});


app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.send('hola mundooo')
})

app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.log('ERROR GET /tasks:', err.message);
        res.status(500).json({ error: err.message });
    }
})


app.post('/tasks', async (req, res) => {
    const {nombre,
        actividad,
        estado,
        resumen,
        descripcion,
        prioridad,
        informador,
        asignado,
        precondicion,
        fecha_creacion,
        fecha_cierre,
        sprint} = req.body;
        const fechaCierre = fecha_cierre || null;

    try {
        const result = await pool.query(
            `INSERT INTO tasks(nombre, actividad, estado, resumen, descripcion, prioridad, informador, asignado, precondicion, fecha_creacion, fecha_cierre, sprint)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
            RETURNING*`,
            [nombre, actividad, estado, resumen, descripcion, prioridad, informador, asignado, precondicion, fecha_creacion, fechaCierre, sprint]
        )
        res.status(201).json(result.rows[0])
    } catch(err) {
        console.log('ERROR POST /tasks:', err.message)
        res.status(500).json({error : err.message})
    }
})

app.post('/tasks/finalizar/:id', async (req, res) => {
    const id = Number(req.params.id)
    try{
        const result = await pool.query(
            `UPDATE tasks SET estado = 'finalizado', 
            fecha_cierre = CURRENT_DATE WHERE id = $1
            RETURNING*`,
            [id]
        )
        if (result.rowCount ===0) return res.status(404).json({error: 'no encontrada'});
        res.json(result.rows[0])
    } catch(err) {
        res.status(500).json({err: err.message})
    }
})

app.put('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    const {nombre,
        actividad,
        estado,
        resumen,
        descripcion,
        prioridad,
        informador,
        asignado,
        precondicion,
        fecha_creacion,
        fecha_cierre,
        sprint} = req.body;
    
    try {
        const result = await pool.query(
           `UPDATE tasks SET
            nombre = $1, actividad = $2, estado = $3, resumen = $4,
            descripcion = $5, prioridad = $6, informador = $7, asignado = $8,
            precondicion = $9, fecha_creacion = $10, fecha_cierre = $11, sprint = $12
            WHERE id = $13
            RETURNING *`
    ,
            [nombre, actividad, estado, resumen, descripcion, prioridad, informador, asignado, precondicion, fecha_creacion, fecha_cierre, sprint, id]
        )
        if(result.rowCount === 0) return res.status(400).json({error: 'no encontrada'});
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({error: err.message})
    }

})

app.delete('/tasks/:id', async (req, res) => {
    const id =Number( req.params.id)
    try {
        const result = await pool.query(
            `DELETE
            FROM tasks
            WHERE id = $1`,
            [id]
        )
        if(result.rowCount === 0) return res.status(404).json({error: 'no encontrada'});
        res.status(204).send()
    } catch(err) {
        res.status(500).json({error : err.message})
    }
    })

app.listen(3000, () => {
    console.log('server en puerto ' ,3000)
})


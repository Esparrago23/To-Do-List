const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const createTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS tareas (
        id SERIAL PRIMARY KEY,
        descripcion VARCHAR(255) NOT NULL,
        completada BOOLEAN DEFAULT FALSE
      );
    `);
    console.log("Tabla 'tareas' verificada/creada exitosamente.");
  } catch (err) {
    console.error("Error al crear la tabla:", err);
  } finally {
    client.release();
  }
};


app.get('/Torres', (req, res) => {
  res.json({ nombreCompleto: "Christian Alejandro Torres Hernandez desde la API de Tareas" });
});



app.get('/tareas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tareas ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al consultar las tareas");
  }
});


app.post('/tareas', async (req, res) => {
  const { descripcion } = req.body;
  if (!descripcion) {
    return res.status(400).send("El campo 'descripcion' es requerido");
  }
  try {
    const result = await pool.query(
      'INSERT INTO tareas (descripcion) VALUES ($1) RETURNING *',
      [descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear la tarea");
  }
});


app.put('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  try {

    const result = await pool.query(
      'UPDATE tareas SET completada = NOT completada WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Tarea no encontrada");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar la tarea");
  }
});


app.delete('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Tarea no encontrada");
    }
    res.json({ message: 'Tarea eliminada', tarea: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar la tarea");
  }
});



app.listen(port, () => {
  console.log(`API de Tareas corriendo en http://localhost:${port}`);
  createTable();
});
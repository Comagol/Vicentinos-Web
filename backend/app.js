// IMPORTACION DE LAS VARIABLES DE ENTORNO
require("dotenv").config();

// IMPORTO EL MODULO EXPRESS
const express = require("express");

//IMPORTACION DE HTTP
const http = require("http");

// IMPORTACION DE PATH
const path = require("path");

//importacion de la base de datos
const connectDB = require("./config/dbClient");

// CREO LA INSTANCIA DE EXPRESS
const app = express();
const server = http.createServer(app);

// CONEXION A LA BASE DE DATOS
connectDB();

// IMPORTO LOS MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

// IMPORTO LAS RUTAS
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);

// DEFINO EL PUERTO
const PORT = process.env.PORT || 5000;

// INICIO EL SERVIDOR
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
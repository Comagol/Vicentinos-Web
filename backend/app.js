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





const PORT = process.env.PORT || 5000;

try {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
} catch (error) {
    console.log(error)
}

export default app;
// IMPORTO EL MODULO EXPRESS
import express from "express";

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
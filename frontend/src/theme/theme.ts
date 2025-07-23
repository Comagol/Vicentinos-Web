import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#002F66",         // Azul oscuro (fondo, encabezados)
    accent: "#F0B341",          // Dorado (detalles, botones)
    background: "#FFFFFF",      // Blanco (fondos, texto)
    softBlue: "#D0DFEE",        // Celeste suave (hover, secciones)
    midBlue: "#336699",         // Azul medio (bordes, sombras)
  },
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Roboto, sans-serif",
  },
  fontSizes: {
    small: "12px",
    medium: "16px",
    large: "24px",
  },
});

export { theme };

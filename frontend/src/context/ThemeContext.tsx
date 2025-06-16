import { createContext, useContext } from "react";
import { theme } from "../theme/theme";

//defino el tipo para el tema
type Theme = typeof theme;

//Creo el contexto con un valor por defecto
const ThemeContext = createContext<Theme | undefined>(undefined);

//Creo el provider
export const ThemeProvider = ({ children }: { children: React.ReactNode}) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

//Creo el hook para usar el contexto
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme debe estar dentro de un ThemeProvider');
    }
    return context;
}

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
            <div style={{
                '--primary-color': theme.colors.primary,
                '--secondary-color': theme.colors.secondary,
                '--tertiary-color': theme.colors.tertiary,
                '--font-family': theme.fonts.body,
                '--font-size-small': theme.fontSizes.small,
                '--font-size-medium': theme.fontSizes.medium,
                '--font-size-large': theme.fontSizes.large,
            } as React.CSSProperties}>
                {children}
            </div>
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

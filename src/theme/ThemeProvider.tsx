import React, { useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext, ThemeContextProps } from "./themeContext";

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

const ThemeProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const defaultProps = useMemo<ThemeContextProps>(() => ({
    theme: theme,
    setTheme: setTheme,
  }), [theme])

  return ( 
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
   );
}

export default ThemeProvider;
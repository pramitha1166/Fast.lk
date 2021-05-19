import React, { createContext, useContext } from 'react'


export const ThemeContext = createContext();

export const ThemeProvider = (props) => {

    const [themeData,setThemeData] = useContext(false)

    return (
        <ThemeContext.Provider value={[themeData,setThemeData]}>
            {props.children}
        </ThemeContext.Provider>
    )
}


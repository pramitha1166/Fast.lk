import React, { createContext, useState } from 'react'


export const ThemeContext = createContext();

export const ThemeProvider = (props) => {

    const [themeData,setThemeData] = useState({
        showCart: false,
        user: {}
    })

    return (
        <ThemeContext.Provider value={[themeData,setThemeData]}>
            {props.children}
        </ThemeContext.Provider>
    )
}


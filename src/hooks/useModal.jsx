import { createContext, useState } from "react";
import { useContext } from "react";



let modalContext = createContext()

let ModalContextProvider = ({children}) =>{

    let [value,setValue] = useState(100)
    
    return(
        <modalContext.Provider value={value} setValue={setValue}>
            {children}
        </modalContext.Provider>
    )
}


let ModalContextConsumer = ({children})=>{
    return (
        <modalContext.Consumer>
            {(context,setContext) =><h1>{context}</h1>}
        </modalContext.Consumer>
    )
}


export {ModalContextProvider,ModalContextConsumer}



























// import React, { useContext } from 'react';
// // The Context 
// const TemplateContext = React.createContext();

// // Template Provider
// const ModalContextProvider = ({children}) => {

//     const [myValue, setMyValue] = React.useState(0);

//     // Context values passed to consumer
//     const value = {
//         myValue,    // <------ Expose Value to Consumer
//         setMyValue  // <------ Expose Setter to Consumer
//     };

//     return (
//         <TemplateContext.Provider value={value}>
//             {children}
//         </TemplateContext.Provider>
//     )
// }

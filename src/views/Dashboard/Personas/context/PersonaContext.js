import { createContext } from "react";

export const PersonaContext = createContext({
    persona: [
        {
            id: "1",
            nombre: "hola",
            done: false
        }
    ]
})
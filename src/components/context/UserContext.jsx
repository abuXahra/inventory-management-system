import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";


export const UserContext = createContext({})


export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => { // to keep user login when browser refresh

        try {
            const res = await axios.get(process.env.REACT_APP_URL + "/api/auth/refetch", { withCredentials: true })
            setUser(res.data)
            //console.log(res.data)
        } catch (err) {
            //console.log(err)
        }

    }

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}

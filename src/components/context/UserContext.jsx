import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";


export const UserContext = createContext({})


export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => { // to keep user login when browser refresh
            try {
                const res = await axios.get(process.env.REACT_APP_URL + "/api/auth/refetch")
                setUser(res.data)
                //console.log(res.data)
            } catch (err) {
                //console.log(err)
            }
    
        }
        getUser()
    }, [])



    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}





// import axios from "axios";
// import { useState, useEffect, createContext } from "react";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await axios.get(`${process.env.REACT_APP_URL}/api/auth/refetch`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUser(res.data); // assuming res.data contains user info
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         localStorage.removeItem("token"); // Clear bad token
//         setUser(null);
//       }
//     };

//     getUser();
//   }, []);

//   // Optional logout function for convenience
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

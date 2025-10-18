// import axios from "axios";
// import { useState } from "react";
// import { createContext } from "react";
// import { useEffect } from "react";


// export const UserContext = createContext({})


// export function UserContextProvider({ children }) {

//     const [user, setUser] = useState(null)

//     useEffect(() => {
//         const getUser = async () => { // to keep user login when browser refresh
//             try {
//                 const res = await axios.get(process.env.REACT_APP_URL + "/api/auth/refetch", { withCredentials: true })
//                 setUser(res.data)
//                 //console.log(res.data)
//             } catch (err) {
//                 //console.log(err)
//             }
    
//         }
//         getUser()
//     }, [])



//     return <UserContext.Provider value={{ user, setUser }}>
//         {children}
//     </UserContext.Provider>
// }







// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const UserContext = createContext();

// export const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   // Optionally refetch user from backend to verify
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_URL}/api/auth/refetch`, {
//           withCredentials: true, // send cookies if backend uses sessions
//         });
//         if (res.data) {
//           setUser(res.data);
//           localStorage.setItem("user", JSON.stringify(res.data));
//         }
//       } catch (err) {
//         console.error("User fetch failed", err);
//         setUser(null);
//         localStorage.removeItem("user");
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, isLoading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };



import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false)
      return;
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/auth/me`, {
                                          headers: {
                                            Authorization: `Bearer ${token}`
                                          }
                                    });
      setUser(res.data);
    } catch (err) {
      console.error("User fetch failed", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

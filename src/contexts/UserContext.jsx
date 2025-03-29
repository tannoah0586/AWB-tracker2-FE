import { createContext, useState } from "react";

const UserContext = createContext();

const getUserFromToken = () =>{
    const token = localStorage.getItem('token');

    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
    const[user,setUser] = useState(getUserFromToken());

    const value = { user,setUser } //convention..
    return(
        <UserContext.Provider value={value}>
                {/* The data we pass to the value prop above is now available to */}
                {/* all the children of the UserProvider component. */}
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
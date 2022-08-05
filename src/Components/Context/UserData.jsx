import React, { useState, createContext, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import firebaseDB from '../../firebase'
const UserInfoContext = createContext()

const UserData = ({ children }) => {
    const [user, setUser] = useState({})
    const [updDataId, setUpdDataId] = useState()
    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    function logout() {
        return signOut(auth)
    }

    function deleteNotes(id) {
        const deleteData = () => {
            if (window.confirm("Are You Sure You Want To Delete It")) {
                firebaseDB.child(`notes/${id}`).remove((err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        alert('Notes Deleted Succesfully !!')
                    }
                })
            }
        }
        return deleteData()
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Auth', currentUser)
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <>
            <UserInfoContext.Provider value={{ user, googleSignIn, logout, deleteNotes }}>
                {children}
            </UserInfoContext.Provider>
        </>
    )
}
export function useUserInfo() {
    return useContext(UserInfoContext)
}
export default UserData
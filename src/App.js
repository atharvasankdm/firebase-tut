import { db } from "./firebase-config";
import "./App.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { useState, useEffect, useRef } from "react";

function App() {
  const [newName, setNewName] = useState("");
  const [Age, setAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(Age) });
  };

const handleUpdate = async (id) =>{

  const userDoc = doc(db,"users",id);
const newField = {name:newName,age:Age};

await updateDoc(userDoc,newField)

setEditing(!isEditing);
window.location.reload()

}

  const handleDelete = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  return (
    <div className="App">
      <input
        placeholder="name.."
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <input
        placeholder="age.."
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <button onClick={createUser}>Add user</button>

      {users.map((user) => {
        return !isEditing ? (
          <div className="field">
            <h1> Name : {user.name}</h1>
            <h1> Age : {user.age}</h1>

            <button
              onClick={() => {
                setEditing(!isEditing);
              }}
            >
              edit
            </button>
            <button
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              delete
            </button>
          </div>
        ) : (
          isEditing && (
            <div className="editField">
              <input placeholder="enter name to be updated" onChange={(e)=>{setNewName(e.target.value)}} />
              <input placeholder="enter age to be updated"  onChange={(e)=>{setAge(e.target.value)}} />
              <button onClick={()=>{handleUpdate(user.id)}}>Update</button>
            </div>
          )
        );
      })}
    </div>
  );
}

export default App;

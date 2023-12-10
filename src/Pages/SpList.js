import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Components/Form';
import List from '../Components/List';
import User from '../Components/User';
import Login from '../Components/LogIn';
import Nothing from './Nothing';
import { useAuth } from '../AuthContext';

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function SpList({ isOwner}) {
  const [input, setInput] = useState("");
  const [h3Content, setH3Content] = useState("Shopping list");
  const [SpId, setSpId] = useState(100);
  const [showChecked, setShowChecked] = useState(false);
  const [ownerId, setOwnerId] = useState(1);
  const [userId, setUserId] = useState(2);
  const [awid, setAwid] = useState(generateRandomString(5));
  const [showNothing, setShowNothing] = useState(false);
  const { loggedInUser, login, logout, setLoggedInUser } = useAuth();

  useEffect(() => {
    const generatedAwid = generateRandomString(5);
    setAwid(generatedAwid);
  }, []);

  const handleH3ContentChange = (event) => {
    if (isOwner) {
      setH3Content(event.target.innerText);
    }
  };

  const [things, setThings] = useState([
    { id: "429x966b-7182-403d-da01-c58a46d165a9", name: "Test:  3 Unicorns", completed: false },
    { id: "389a123c-7267-033m-be02-c59a76f165i0", name: "Test: Liquid Chalk", completed: true },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Owner', isOwner: true },
    { id: 2, name: 'User 1', isOwner: false },
    { id: 3, name: 'User 2', isOwner: false },
  ]);

  const handleAddUser = () => {
    if (loggedInUser && loggedInUser.id === 1) {
      const newUserId = userId + 1;
      const newUser = { id: newUserId, name: `User ${newUserId}`, isOwner: false };
      setUsers([...users, newUser]);
      setUserId(newUserId);
    } else {
      alert("You don't have the right for this");
    }
  };

  const handleDeleteUser = (id) => {
    if (loggedInUser && (loggedInUser.id === 1 || id === loggedInUser.id)) {
      if (id === loggedInUser.id) {
        setShowNothing(true);
      } else {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      }
    } else {
      alert("You don't have the right to do this");
    }
  };

  const handleLogin = (username, password) => {
    if (username === "owner" && password === "owner") {
      setLoggedInUser({ username: "owner", role: "owner", id: ownerId });
    } else if (username === "user" && password === "user") {
      setLoggedInUser({ username: "user", role: "user", id: userId });
    }
  };

  useEffect(() => {
    const storedSpList = localStorage.getItem('storedSpList');
    if (storedSpList) {
      const parsedSpList = JSON.parse(storedSpList);
      setAwid(parsedSpList.awid);
      setSpId(parsedSpList.SpId);
      setThings(parsedSpList.things);
      setUsers(parsedSpList.users);
    }
  }, []);

  useEffect(() => {
    const dataToStore = {
      awid,
      SpId,
      things,
      users,
    };
    localStorage.setItem('storedSpList', JSON.stringify(dataToStore));
  }, [awid, SpId, things, users]);

  const handleToggle = (itemId) => {
    setThings((prevThings) =>
      prevThings.map((thing) =>
        thing.id === itemId ? { ...thing, completed: !thing.completed } : thing
      )
    );
  };
  useEffect(() => {

    document.body.style.overflow = 'visible'})
  const filteredItems = showChecked ? things : things.filter((item) => !item.completed);

  return (
    <div className='SpListContainer' style={{
     
      width: '500px',
      margin: '0 auto',
      backgroundColor: 'rgb(237, 238, 238)',
      padding: '20px',
      border: '1px solid rgb(170, 170, 219)',
      borderTop: 'none',
      height: '100vh'
    }}>
      {loggedInUser ? (
        <div>
          <h3 contentEditable={loggedInUser.id === 1} onInput={handleH3ContentChange} style={{border: '1px solid rgb(170, 170, 219', borderRadius:'20px'}}>
            {h3Content}
          </h3>
          {loggedInUser.role === "owner" ? (
            <User users={users} ownerId={ownerId} onAddUser={handleAddUser} onDeleteUser={handleDeleteUser} />
          ) : (
            <User users={users} userId={loggedInUser.id} onDeleteUser={handleDeleteUser} />
          )}
          <h4>Items</h4>
          <label>
            <input
              type="checkbox"
              checked={showChecked}
              onChange={() => setShowChecked(!showChecked)}
            />
            Show All Items
          </label>
          <List items={filteredItems}  onToggle={handleToggle} setItems={setThings} />
          <Form input={input} setInput={setInput} things={things} setThings={setThings} />
          {showNothing && <Nothing />}
        </div>
      ) : (
        // Additional content for when the user is not logged in can be added here
        <p>Please log in to access the Shopping List.</p>
      )}
    </div>
  );
}

export default SpList;
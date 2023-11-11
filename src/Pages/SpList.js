import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Components/Form';
import List from '../Components/List';
import User from '../Components/User';
import Login from '../Components/LogIn';
import Nothing from './Nothing';

function SpList({ isOwner }) {
  const [input, setInput] = useState("");
  const [h3Content, setH3Content] = useState("Shopping list");
  const [SpId, setSpId] = useState(1);
  const [showChecked, setShowChecked] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [ownerId, setOwnerId] = useState(1);
  const [userId, setUserId] = useState(2);
  const [showNothing, setShowNothing] = useState(false);

  const handleH3ContentChange = (event) => {
    if (isOwner) {
      setH3Content(event.target.innerText);
    }
  };

  const [things, setThings] = useState([
    { id: 1, name: "Test:  3 Unicorns", completed: false },
    { id: 2, name: "Test: Liquid Chalk", completed: true },
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
      setSpId(parsedSpList.SpId);
      setThings(parsedSpList.things);
      setUsers(parsedSpList.users);
    }
  }, []);

  useEffect(() => {
    const dataToStore = {
      SpId,
      things,
      users,
    };
    localStorage.setItem('storedSpList', JSON.stringify(dataToStore));
  }, [SpId, things, users]);

  const handleToggle = (itemId) => {
    setThings((prevThings) =>
      prevThings.map((thing) =>
        thing.id === itemId ? { ...thing, completed: !thing.completed } : thing
      )
    );
  };

  const filteredItems = showChecked ? things : things.filter(item => !item.completed);

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
          <h3 contentEditable={loggedInUser.id === 1} onInput={handleH3ContentChange}>
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
          <List items={filteredItems} onToggle={handleToggle} setItems={setThings} />
          <Form input={input} setInput={setInput} things={things} setThings={setThings} />
          {showNothing && <Nothing />}
        </div>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  )
}

export default SpList;

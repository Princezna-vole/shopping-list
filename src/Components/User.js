import React from 'react'
import Button from './Button';

function User({ users, ownerId, userId, onAddUser, onDeleteUser }) {
const handleAddUser = (id) => {
        if (ownerId === 1) {
            const newUserId = users.length + 1;
            onAddUser(newUserId, id);
          } else {alert("You don't have rights for this")}
         
      };
const handleDeleteUser = (id) => {
  if (ownerId === ownerId || userId === userId) {
    onDeleteUser(id);
  }
};


return (
    <div className='users'>
     {users.map((user) => (
    <li key={user.id} style={{ display: 'flex', alignItems: 'center' }}>
     <span style={{ flex: 1, paddingRight: '0px' }}>{user.name}</span>
     {user.isOwner && <span style={{ flex: -1}}> (Owner)</span>}
     <Button className='delete' onClick={() => handleDeleteUser(user.id)} style={{ border: '1px solid rgb(126, 62, 107)', backgroundColor: 'transparent', color: 'rgb(126, 62, 107)', borderRadius: '15px', margin: '5px 20px', padding: '7px', width: '60px', fontWeight: '800' }}>
  <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
    <style>{'svg{fill:rgb(126, 62, 107);}'}</style>
    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
  </svg>
</Button>    </li>
    ))}
   
    { <Button className='add' onClick={handleAddUser}>Add User</Button>}
  </div>
  )
}

export default User
  
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
     <Button className='delete' onClick={(ownerId)=> handleDeleteUser(user.id)} style={{ border:'1px solid rgb(126, 62, 107)', backgroundColor: 'transparent', color: 'rgb(126, 62, 107)', borderRadius: '15px', margin:'5px 20px', padding:'7px', width:'90px', fontWeight: '800'}}>Delete User</Button>
    </li>
    ))}
   
    { <Button className='add' onClick={handleAddUser}>Add User</Button>}
  </div>
  )
}

export default User
  
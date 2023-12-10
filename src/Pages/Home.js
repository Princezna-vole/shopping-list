// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewSpListModal from '../Components/NewSpListModal';
import Button from '../Components/Button';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spLists, setSpLists] = useState([
    { id: 100, name: "Shopping List 1" },
    { id: 101, name: "Shopping List 2" },
    { id: 102, name: "Shopping List 3" },
  ]);
  const [archivedSpLists, setArchivedSpLists] = useState([]); // Initialize archived lists

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddSpList = (newSpListName) => {
    const newSpListId = Math.max(...spLists.map((spList) => spList.id), 103) + 1;
    setSpLists([...spLists, { id: newSpListId, name: newSpListName }]);
  };

  const handleDeleteSpList = (spListId) => {
    const indexToDelete = spLists.findIndex((spList) => spList.id === spListId);

    if (indexToDelete !== -1) {
      const deletedSpList = spLists.splice(indexToDelete, 1)[0];
      setSpLists([...spLists]);
      setArchivedSpLists([...archivedSpLists, deletedSpList]);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  });

  return (
    <div
      style={{
        width: '500px',
        margin: '0 auto',
        backgroundColor: 'rgb(237, 238, 238)',
        padding: '20px',
        border: '1px solid rgb(170, 170, 219)',
        borderTop: 'none',
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
      }}
    >
      {spLists.map((spList) => (
        <div
          key={spList.id}
          style={{
            width: '60%',  
            marginBottom: '5px',
            padding: '15px',
            flexDirection:'column',
            border: '1px solid rgb(137, 137, 191)',
            borderRadius: '20px',
          }}
        >
          <Link to={`/Pages/SpList/${spList.id}`}>{spList.name}</Link>
          <Button onClick={() => handleDeleteSpList(spList.id)}>Delete</Button>
        </div>
      ))}
      <Button onClick={handleOpenModal}>New Shopping List</Button>
      {isModalOpen && <NewSpListModal onClose={() => setIsModalOpen(false)} onAddSpList={handleAddSpList} />}
     
        <h3>Archived lists</h3>
      
          {archivedSpLists.map((spList) => (<div
          key={spList.id}
          style={{
            width: '60%',  
            marginBottom: '5px',
            padding: '25px 15px',
            border: '1px solid rgb(137, 137, 191)',
            borderRadius: '20px',
          }}
        >
              <Link to={`/Pages/SpList/${spList.id}`}>{spList.name}</Link>
              </div>
          ))}
   

    </div>
  );
}

export default Home;

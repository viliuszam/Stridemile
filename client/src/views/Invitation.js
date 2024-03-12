import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function InvitationPage() {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  const handleJoinClick = async () => {
    try {
      const response = await fetch('http://localhost:3333/groups/joinGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result);
      } else {
        throw new Error('Failed to join the group');
      }
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to our group!</h1>
      <button onClick={handleJoinClick}>Join</button>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={50}
        readOnly
      />
    </div>
  );
}

export default InvitationPage;

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

function ShortlistedAwbs() {
  const { user } = useContext(UserContext);
  const [shortlistedAwbs, setShortlistedAwbs] = useState([]);
  const handleRemoveAwb = async (savedAwbId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/savedAwbs/${savedAwbId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove saved AWB.');
        }

        // Update the state to remove the deleted AWB from the list
        setShortlistedAwbs(shortlistedAwbs.filter((awb) => awb._id !== savedAwbId));
    } catch (error) {
        console.error('Error removing saved AWB:', error);
        alert(error.message);
    }
};


  useEffect(() => {
    const fetchShortlistedAwbs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/savedAwbs/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch shortlisted AWBs.');
        }

        const data = await response.json();
        setShortlistedAwbs(data);
      } catch (error) {
        console.error('Error fetching shortlisted AWBs:', error);
      }
    };

    if (user) {
      fetchShortlistedAwbs();
    }
  }, [user]);

  return (
    <div>
      <h2>Your Saved AWBs</h2>
      {shortlistedAwbs.length > 0 ? (
        <ul>
          {shortlistedAwbs.map((awb) => (
            <li key={awb._id}>
              <Link to={`/awb/${awb.awbId._id}`}>{awb.awbId["HAWB/HBL"]} - {awb.awbId["Departure Port"]}</Link>
              <button onClick={()=>handleRemoveAwb(awb._id)}>Remove AWB</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved AWBs found.</p>
      )}
      <Link to='/'>Back to Dashboard</Link>
    </div>
  );
}

export default ShortlistedAwbs;
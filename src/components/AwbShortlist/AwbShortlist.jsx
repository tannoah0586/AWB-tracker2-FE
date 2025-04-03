import React from 'react';
import './AwbShortlist.css'

function AwbShortlist({ selectedAwbs, onSaveSuccess }) {
  const handleSave = async () => {
    if (!selectedAwbs || selectedAwbs.length === 0) {
      alert('Please select AWBs to save.');
      return;
    }

    try {
      for (const awbId of selectedAwbs) {
        const backendUrl =  import.meta.env.VITE_BACK_END_SERVER_URL;
        const response = await fetch(`${backendUrl}/savedAwbs/`, { // correct front end path
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ awbId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.err || 'Failed to save AWB.');
        }

        const savedAwb = await response.json();
        console.log('AWB saved:', savedAwb);
      }
      alert('AWBs saved successfully!');
      if(onSaveSuccess) {
          onSaveSuccess();
      }
    } catch (error) {
      console.error('Error saving AWBs:', error);
      alert(error.message);
    }
  };

  return (
    <div>
    <button onClick={handleSave}>Save Selected AWBs</button>
    </div>
  );
}

export default AwbShortlist;
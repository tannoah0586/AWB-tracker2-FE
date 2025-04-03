import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import './ShortlistedAwbs.css';

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
        <div className="shortlisted-awbs-container">
            <h2 className="shortlisted-awbs-title">Your Saved AWBs</h2>
            {shortlistedAwbs.length > 0 ? (
                <ul className="shortlisted-awbs-list">
                    {shortlistedAwbs.map((awb) => (
                        <li key={awb._id} className="shortlisted-awbs-item">
                            <Link to={`/awb/${awb.awbId._id}`} className="shortlisted-awbs-link">
                                {awb.awbId["HAWB/HBL"]} - {awb.awbId["Departure Port"]}
                            </Link>
                            <button className="shortlisted-awbs-remove-button" onClick={() => handleRemoveAwb(awb._id)}>
                                Remove AWB
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="shortlisted-awbs-empty">No saved AWBs found.</p>
            )}
            <Link to="/" className="shortlisted-awbs-back-link">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default ShortlistedAwbs;
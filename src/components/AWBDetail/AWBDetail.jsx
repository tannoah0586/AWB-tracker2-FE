import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import * as awbService from '../../services/awbService';
import './AWBDetail.css';

const AWBDetail = () => {
    const { awbId } = useParams();
    const [awb, setAwb] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchAwb = async () => {
            try {
                const fetchedAwb = await awbService.getAwbById(awbId);
                setAwb(fetchedAwb);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchAwb();
    }, [awbId]);

    if (loading) return <p className="awb-detail-loading">Loading...</p>;
    if (error) return <p className="awb-detail-error">Error: {error.message}</p>;
    if (!awb) return <p className="awb-detail-not-found">AWB not found!</p>;

    return (
        <div className="awb-detail-container">
            <h1 className="awb-detail-title">AWB Details</h1>
            <button className="awb-detail-back-button" onClick={handleBackToDashboard}>
                Back to Dashboard
            </button>
            <div className="awb-detail-data">
                {Object.entries(awb).map(([key, value]) => (
                    <div key={key} className="awb-detail-item">
                        <strong className="awb-detail-key">{key}:</strong>
                        <span className="awb-detail-value">{String(value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AWBDetail;
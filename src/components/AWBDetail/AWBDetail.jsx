import { useState,useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import * as awbService from '../../services/awbService';

const AWBDetail = ()=>{
    const { awbId } =useParams();
    const [awb,setAwb] =useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate("/") //back to dashboard
    };

    useEffect(()=>{
        const fetchAwb = async()=>{
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
    },[awbId])

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>
    if(!awb) return <p>AWB not found!</p>

    return(
        <div>
        <h1>AWB Details</h1>
        <button onClick={handleBackToDashboard}>Back to Dashboard</button>
            {Object.entries(awb).map(([key, value]) => (
                <div key={key} style={{ marginBottom: "10px" }}>
                    <strong style={{ display: "inline-block", width: "200px" }}>
                        {key}:
                    </strong>
                    <span>{String(value)}</span>
                </div>
            ))}
        
    </div>   
    
    );
};

export default AWBDetail;
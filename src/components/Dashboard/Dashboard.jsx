import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import * as awbService from '../../services/awbService';
import { Link } from 'react-router-dom';
import AwbShortlist from "../AwbShortlist/AwbShortlist";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [awbs, setAwbs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        "Departure Port": "",
        "Transport Mode": "",
        "Departure Country Name":"",
        "Carrier":"",
        "Proof Of Delivery (POD)": "",
        "Service Type": "",
        "Project ID": "",
    });
    const [selectedAwbs,setSelectedAwbs] = useState([]);

    useEffect(() => {
        const fetchAwbs = async () => {
            try {
                const fetchedAwbs = await awbService.index(page, limit, filters);
                setAwbs(fetchedAwbs.awbs);
                setTotalPages(fetchedAwbs.totalPages);
            } catch (err) {
                console.error(err);
            }
        };

        if (user) {
            fetchAwbs();
        }
    }, [user, page, limit, filters]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (awbId,isChecked) => {
        if (isChecked) {
            setSelectedAwbs([...selectedAwbs,awbId]);
        } else {
            setSelectedAwbs(selectedAwbs.filter((id) => id!== awbId));
        }
    };

    const refreshedAwbs = ()=> {
        const fetchAwbs = async()=> {
            try {
                const fetchedAwbs = await awbService.index(page,limit,filters);
                setAwbs(fetchedAwbs.awbs);
                setTotalPages(fetchedAwbs.totalPages);
            } catch (err) {
                console.error(err);
            }
        };
        if (user) {
            fetchAwbs();
        }
        setSelectedAwbs([]) //clear afterr refreshed
    }

    return (
        <main>
            <h1>Welcome, {user.username}</h1>
            <Link to="/shortlisted">View Your Saved AWBs</Link>
            <p>This is the dashboard page where you can see a list of AWBs.</p>

            {/* Filters */}
            <div>
                <select name="Departure Country Name" onChange={handleFilterChange}>
                    <option value="">All Departure Countries</option>
                    <option value="CHINA">China</option>
                    <option value="INDIA">India</option>
                    <option value="USA">USA</option>
                    <option value="AUSTRALIA">Australia</option>
                </select>
                <select name="Departure Port" onChange={handleFilterChange}>
                    <option value="">All Departure Ports</option>
                    <option value="BLR">Bangalore</option>
                    <option value="BOM">Bombay</option>
                    <option value="DEL">Delhi</option>
                    <option value="COK">Cochin</option>
                    <option value="MKE">Milwakee</option>
                </select>

                <select name="Transport Mode" onChange={handleFilterChange}>
                    <option value="">All Transport Mode</option>
                    <option value="Air">Air</option>
                    <option value="Ocean">Ocean</option>
                </select>

                <select name="Carrier" onChange={handleFilterChange}>
                    <option value="">All Carriers</option>
                    <option value="Thai Airways International Public">Thai Airways International Public</option>
                    <option value="Singapore Airlines Limited">Singapore Airlines Limited</option>
                    <option value="Air India Limited">Air India Limited</option>
                    <option value="China Airlines Ltd.">China Airlines Ltd.</option>
                    <option value="SriLankan Airlines Ltd">SriLankan Airlines Ltd</option>
                    <option value="Eva Airways Corporation">Eva Airways Corporation</option>
                    <option value="KOREA MARINE TRANSPORT CO/E C TEAM">KOREA MARINE TRANSPORT</option>
                </select>

                <select name="Destination Country" onChange={handleFilterChange}>
                    <option value="">All Destination Countries</option>
                    <option value="SIN">Singapore</option>
                </select>

                <select name="Proof Of Delivery (POD)" onChange={handleFilterChange}>
                    <option value="">All POD Status (At Risk)</option>
                    <option value="empty">Not delivered</option>
                </select>

                <select name="Service Type" onChange={handleFilterChange}>
                    <option value ="">All Service Types</option>
                    <option value ="DD">Door to Door</option>
                    <option value = "DA">Door to Airport</option>
                    <option value="AD">Airport to Door</option>
                    <option value="AA">Airport to Airport</option>
                </select>

                <select name="Project ID" onChange={handleFilterChange}>
                    <option value="">All Business Units</option>
                    <option value="GEGSPO">GSPO</option>
                </select>
            </div>

            {/* AWB List */}
            {awbs.length > 0 && (
                <ul>
                    {awbs.map((awb) => (
                        <li key={awb._id}>
                            <Link to={`/awb/${awb._id}`}>
                            {awb["HAWB/HBL"]} - {awb["Departure Port"]} 
                            </Link>
                            <input 
                                type="checkbox"
                                onChange={(e)=>handleCheckboxChange(awb._id,e.target.checked)}
                            />  
                        </li>
                    ))}
                </ul>
            )}

            {/* Pagination */}
            <div>
                {page > 1 && <button onClick={() => handlePageChange(page - 1)}>Previous</button>}
                <span>Page {page} of {totalPages}</span>
                {page < totalPages && <button onClick={() => handlePageChange(page + 1)}>Next</button>}
            </div>
            {/* AwbShortlist Component */}
            <AwbShortlist selectedAwbs={selectedAwbs} onSaveSuccess={refreshedAwbs}/>
        </main>
    );
};

export default Dashboard;
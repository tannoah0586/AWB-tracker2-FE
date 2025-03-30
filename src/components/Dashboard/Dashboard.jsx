import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import * as awbService from '../../services/awbService';

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
    });

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

    return (
        <main>
            <h1>Welcome, {user.username}</h1>
            <p>This is the dashboard page where you can see a list of AWBs.</p>

            {/* Filters */}
            <div>
                <select name="Departure Country Name" onChange={handleFilterChange}>
                    <option value="">All Departure Countries</option>
                    <option value="CHINA">China</option>
                    <option value="INDIA">India</option>
                    <option value="USA">USA</option>
                </select>
                <select name="Departure Port" onChange={handleFilterChange}>
                    <option value="">All Departure Ports</option>
                    <option value="BLR">Bangalore</option>
                    <option value="BOM">Bombay</option>
                    <option value="DEL">Delhi</option>
                    <option value="COK">Calcutta</option>
                    <option value="MKE">MILWAUKEE</option>
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
            </div>

            {/* AWB List */}
            {awbs.length > 0 && (
                <ul>
                    {awbs.map((awb) => (
                        <li key={awb._id}>
                            {awb["HAWB/HBL"]} - {awb["Departure Port"]} 
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
        </main>
    );
};

export default Dashboard;
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
                <select name="Departure Port" onChange={handleFilterChange}>
                    <option value="">All Departure Ports</option>
                    <option value="BLR">Bangalore</option>
                    <option value="BOM">Bombay</option>
                    <option value="DEL">Delhi</option>
                    <option value="COK">Calcutta</option>
                    <option value="MKE">MILWAUKEE</option>
                </select>

                <select name="Proof Of Delivery (POD)" onChange={handleFilterChange}>
                    <option value="">All POD Status</option>
                    <option value="empty">Empty</option>
                </select>
            </div>

            {/* AWB List */}
            {awbs.length > 0 && (
                <ul>
                    {awbs.map((awb) => (
                        <li key={awb._id}>
                            {awb["HAWB/HBL"]} - {awb["Departure Port"]} - {awb["Proof Of Delivery (POD)"]}
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
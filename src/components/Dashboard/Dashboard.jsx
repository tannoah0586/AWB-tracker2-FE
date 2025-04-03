import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import * as awbService from '../../services/awbService';
import { Link } from 'react-router-dom';
import AwbShortlist from "../AwbShortlist/AwbShortlist";
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [awbs, setAwbs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        "Departure Port": "",
        "Transport Mode": "",
        "Departure Country Name": "",
        "Carrier": "",
        "Proof Of Delivery (POD)": "",
        "Service Type": "",
        "Project ID": "",
    });
    const [selectedAwbs, setSelectedAwbs] = useState([]);

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

    const handleCheckboxChange = (awbId, isChecked) => {
        if (isChecked) {
            setSelectedAwbs([...selectedAwbs, awbId]);
        } else {
            setSelectedAwbs(selectedAwbs.filter((id) => id !== awbId));
        }
    };

    const refreshedAwbs = () => {
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
        setSelectedAwbs([]); //clear after refreshed
    }

    const handleResetFilters = () => {
        setFilters({
            "Departure Port": "",
            "Transport Mode": "",
            "Departure Country Name": "",
            "Carrier": "",
            "Proof Of Delivery (POD)": "",
            "Service Type": "",
            "Project ID": "",
        });
        setPage(1);
    };

    return (
        <main className="dashboard-container">
            <h3 className="dashboard-title">Hi, {user.username}, welcome to the automated control tower!</h3>

            {/* Filters */}
            <div className="dashboard-filters">
                <select
                    name="Departure Country Name"
                    onChange={handleFilterChange}
                    className="dashboard-select"
                    value={filters["Departure Country Name"]}
                >
                    <option value="">All Departure Countries</option>
                    <option value="CHINA">China</option>
                    <option value="INDIA">India</option>
                    <option value="USA">USA</option>
                    <option value="AUSTRALIA">Australia</option>
                </select>
                <select
                    name="Departure Port"
                    onChange={handleFilterChange}
                    className="dashboard-select"
                    value={filters["Departure Port"]}
                >
                    <option value="">All Departure Ports</option>
                    <option value="BLR">Bangalore</option>
                    <option value="BOM">Bombay</option>
                    <option value="DEL">Delhi</option>
                    <option value="COK">Cochin</option>
                    <option value="MKE">Milwakee</option>
                </select>

                <select
                    name="Transport Mode"
                    onChange={handleFilterChange}
                    className="dashboard-select"
                    value={filters["Transport Mode"]}
                >
                    <option value="">All Transport Mode</option>
                    <option value="Air">Air</option>
                    <option value="Ocean">Ocean</option>
                </select>

                <select
                    name="Carrier"
                    onChange={handleFilterChange}
                    className="dashboard-select"
                    value={filters["Carrier"]}
                >
                    <option value="">All Carriers</option>
                    <option value="Thai Airways International Public">Thai Airways International Public</option>
                    <option value="Singapore Airlines Limited">Singapore Airlines Limited</option>
                    <option value="Air India Limited">Air India Limited</option>
                    <option value="China Airlines Ltd.">China Airlines Ltd.</option>
                    <option value="SriLankan Airlines Ltd">SriLankan Airlines Ltd</option>
                    <option value="Eva Airways Corporation">Eva Airways Corporation</option>
                    <option value="KOREA MARINE TRANSPORT CO/E C TEAM">KOREA MARINE TRANSPORT</option>
                </select>

                <select
                    name="Destination Country"
                    onChange={handleFilterChange}
                    className="dashboard-select"
                    value={filters["Destination Country"]}
                >
                    <option value="">All Destination Countries</option>
                    <option value="SIN">Singapore</option>
                </select>

                <select
                    name="Proof Of Delivery (POD)"
                    onChange={handleFilterChange}
                    className="dashboard-select"
                    value={filters["Proof Of Delivery (POD)"]}
                >
                    <option value="">All POD Status (At Risk)</option>
                    <option value="empty">Not delivered</option>
                </select>

                <select
                    name="Service Type"
                    onChange={handleFilterChange}
                    className="dashboard-select"
                    value={filters["Service Type"]}
                >
                    <option value="">All Service Types</option>
                    <option value="DD">Door to Door</option>
                    <option value="DA">Door to Airport</option>
                    <option value="AD">Airport to Door</option>
                    <option value="AA">Airport to Airport</option>
                </select>

                <select
                    name="Project ID"
                    onChange={handleFilterChange}
                    className="dashboard-select"
                    value={filters["Project ID"]}
                >
                    <option value="">All Business Units</option>
                    <option value="GEGSPO">GSPO</option>
                </select>

                <button onClick={handleResetFilters} className="dashboard-reset-button">
                    Reset Filters
                </button>
            </div>

            {/* AWB List */}
            {awbs.length > 0 && (
                <ul className="dashboard-list">
                    {awbs.map((awb) => (
                        <li key={awb._id} className="dashboard-list-item">
                            <Link to={`/awb/${awb._id}`} className="dashboard-awb-link">
                                {awb["HAWB/HBL"]} - {awb["Departure Port"]} to {awb["Destination Port"]} on {awb["Carrier"]} with POD status: {awb["Proof Of Delivery (POD)"]}
                            </Link>
                            <input
                                type="checkbox"
                                onChange={(e) => handleCheckboxChange(awb._id, e.target.checked)}
                                className="dashboard-checkbox"
                            />
                        </li>
                    ))}
                </ul>
            )}
            {/* AwbShortlist Component */}
            <AwbShortlist selectedAwbs={selectedAwbs} onSaveSuccess={refreshedAwbs} />
            {/* Pagination */}
            <div className="dashboard-pagination">
                {page > 1 && <button onClick={() => handlePageChange(page - 1)} className="dashboard-button">Previous</button>}
                <span className="dashboard-page-info">Page {page} of {totalPages}</span>
                {page < totalPages && <button onClick={() => handlePageChange(page + 1)} className="dashboard-button">Next</button>}
            </div>

        </main>
    );
};

export default Dashboard;
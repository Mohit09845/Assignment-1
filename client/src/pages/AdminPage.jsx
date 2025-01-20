import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/user/admin');
                setUsers(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch user data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (isLoading) {
        return <div className="text-center mt-8">Loading user data...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
            {users.length === 0 ? (
                <p className="text-center">No user submissions found.</p>
            ) : (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Social Media Handle</th>
                            <th className="px-4 py-2 border">Images</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="bg-white hover:bg-gray-100">
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">{user.socialMedia}</td>
                                <td className="px-4 py-2 border">
                                    <div className="flex gap-2 flex-wrap">
                                        {user.images.map((image, index) => (
                                            <a
                                                key={index}
                                                href={image}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Uploaded by ${user.name}`}
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPage;

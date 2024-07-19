import React, { useEffect, useState } from 'react';
import './Home.css'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const location=useLocation()
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState(null);
    const [currentUser,setCurrentUser]=useState(location.state.data.email)
    const [updatedData, setUpdatedData] = useState({
        name: '',
        email: '',
        password: '',
       
    });
 console.log(currentUser,'hhh')

    const [isEditing, setIsEditing] = useState(false);

    const handleLogout = () => {
        navigate('/')
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3500/user/login');
            const users = response.data;
            const user = users.find((user) => user.email === currentUser);
            setData(users);
            setProfile(user);
            console.log(profile)
            if (user) {
                setUpdatedData({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                   
                });
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleEditClick = () => {
        
        setIsEditing(true);
    };

    const handleSaveClick = async (id) => {
        try {
            await axios.post('http://localhost:3500/user/edit', { _id: id, ...updatedData });
            fetchData();
            setIsEditing(false);
            window.alert("Updated successfully");
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.post('http://localhost:3500/user/delete', { _id: id });
            fetchData();
            navigate('/');
        } catch (err) {
            console.error('Error deleting profile:', err);
        }
    };

    return (
        <div className='container1'>
            <div className='flex-1'>
            <h1 className='h1'>User Details</h1>
            <button className='logout-container' onClick={handleLogout}>Log Out</button>
            </div>
            <table border={1} className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                       
                       
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {profile ? (
                        <tr>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedData.name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    profile.name
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={updatedData.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    profile.email
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="password"
                                        name="password"
                                        value={updatedData.password}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    profile.password
                                )}
                            </td>
                           <td>
                                {isEditing ? (
                                    <button onClick={() => handleSaveClick(profile._id)}>Save</button>
                                ) : (
                                    <button onClick={handleEditClick}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(profile._id)}>Delete</button>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="7">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Home;

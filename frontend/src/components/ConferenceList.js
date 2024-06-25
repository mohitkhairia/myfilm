import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConferenceList = () => {
    const [conferences, setConferences] = useState([]);
    const[formData, setFormData] = useState({
        title: '',
        description: '',
        schedule: '',
        location: '',
    });

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/conferences');
                setConferences(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConferences();
    }, []);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/conferences', formData);
            if(response.status === 201){
                alert('Conference created successfully');
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to create conference");
        }
    }
    return (
        <div>
           <h2>Conferences</h2>
           <form onSubmit={handleSubmit}>
               <label>
                   Title:
                   <input
                       type="text"
                       name="title"
                       value={formData.title}
                       onChange={handleChange}
                       placeholder='Enter your title'
                       required
                   />
               </label>
               <br />
               <label>
                   Description:
                   <input
                       type="text"
                       name="description"
                       value={formData.description} 
                       onChange={handleChange}
                       placeholder='Enter your description'
                       required
                   />
               </label>
               <br />
               <label>
                   Schedule:
                   <input
                       type="text"
                       name="schedule"
                       value={formData.schedule}
                       onChange={handleChange}
                       placeholder='Enter your schedule'
                       required
                   />
               </label>
               <br />
               <label>
                   Location:
                   <input
                       type="text"
                       name="location"
                       value={formData.location}
                       onChange={handleChange}
                       placeholder='Enter your location'
                       required
                   />
               </label>
               <br />
               <button type="submit">Create Conference</button>
           </form>
           {conferences.map((conference) => (
               <div key={conference._id}>
                   <h3>{conference.title}</h3>
                   <p>{conference.description}</p>
                   <p>{conference.schedule}</p>
                   <p>{conference.location}</p>
               </div>
           ))}

        </div>
    );
};


export default ConferenceList
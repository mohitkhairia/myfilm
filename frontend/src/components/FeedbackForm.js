import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FeedbackForm = () => {
    const [conferences, setConferences] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [formData, setFormData] = useState({
        conferenceId: '',
        comments: '',
        rating: '',
    });

    useEffect(() => {
        fetchConferences();
        fetchFeedbacks();
    }, []);

    const fetchConferences = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/conferences');
            setConferences(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFeedbacks = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/feedbacks');
          console.log(response.data);
          setFeedbacks(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       const token = localStorage.getItem('token');
       if(!token){
            alert('Please login to give feedback');
            return;
       }

       try{
           const response = await axios.post('http://localhost:5000/api/feedbacks', {
            ...formData,
           },{
               headers: {
                   Authorization: `Bearer ${token}`
               }
           })
           if(response.status === 201){
               alert('Feedback created successfully');
           }
           setFormData({conferenceId: '', comments: '', rating: ''});
           console.log(response.data);
       }catch(err){
           console.error(err);
       }
       
    };
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                Conference:
                <select
                    name="conferenceId"
                    value={formData.conferenceId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a conference</option>
                    {conferences.map((conference) => (
                        <option key={conference._id} value={conference._id}>
                            {conference.title}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Comments:
                <input
                    type="text"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder='Enter your comments'
                    required
                />
            </label>
            <br />
            <label>
                Rating:
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder='Enter your rating'
                    required
                    min={1}
                    max={5}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        <h2>Feedbacks:</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback._id}>
            <h3>User:  {feedback.userId.name}</h3>
          <p>Comment: {feedback.comments}</p>
          <p>Rating: {feedback.rating}</p>
          <p>Conference: {feedback.conferenceId.title}</p>
          </div>
      ))}
        </div>
    );
};

export default FeedbackForm;
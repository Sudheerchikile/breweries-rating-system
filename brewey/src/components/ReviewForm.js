import React, { useState } from "react";
import axios from "axios"
import {useSelector} from "react-redux"


const ReviewForm = ({breweryId,onReviewSubmit}) => {
  const {user}=useSelector((state)=>state.user);
  const [name, setName] = useState(user?user.name:"");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit clicked")

    try {
      const response = await axios.post('/api/add/newReview', {
        breweryId,
        name,
        rating,
        description,
      });

      console.log('Review added:', response.data);
      

      // Clear form fields or perform other actions upon successful submission
      setName('');
      setRating(0);
      setDescription('');
      onReviewSubmit();
    } catch (error) {
      console.error('Error adding review:', error);

      // Handle error state if needed
    }
  };
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <p className="review-form-heading">Add a Review</p>
      <div className="form-group">
        <label className="form-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="form-input"
            min="0"
            max="5"
            step="1"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            required
          />
        </label>
      </div>
      <button type="submit" className="class-button">Submit</button>
    </form>
  );
};

export default ReviewForm;

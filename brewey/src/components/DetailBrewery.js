import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import axios from "axios";

const DetailBreweryPage = () => {
  const { id } = useParams(); 
 
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchBrewery = async () => {
    try {
      const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBrewery(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching brewery:", error);
      // Handle error state if needed
    }
  };


  useEffect(() => {
   
    fetchBrewery();
  }, []); 

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/add/reviews/${id}`);
      // Corrected to axios.get for GET request
      if (response.status !== 200) { // Checking status directly since axios handles it internally
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setReviews(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Handle error state if needed
    }
  };



  useEffect(() => {
   
    fetchReviews();
  }, [id]); 


  let totalRating = 0;

 
  reviews.forEach(review => {
    totalRating += parseInt(review.rating, 10);
  });
  
  
  const avgRating = reviews?.length > 0 ? totalRating / reviews.length : "no reviews";
  

 

  return (
    <div className="con">
      <div className="details-form-con">
        <div className="detail-details">
          <h5>Name: {brewery?.name}</h5>
          <p className="rate">Avg.Rating :{avgRating}</p>
          <p>Country: {brewery?.country}</p>
          <p>City: {brewery?.city}</p>
          <p>State: {brewery?.state}</p>
          <p>street: {brewery?.street}</p>
          <p>Website: {brewery?.website_url}</p>
          <p>Phone: {brewery?.phone}</p>
          {/* Add more details as needed */}
        </div>
        <div>
          <ReviewForm breweryId={id} onReviewSubmit={fetchReviews} />
        </div>
      </div>
      <hr className="hr-line" />
      <div className="reviews-con">
        <h2 className="reviews-heading">Reviews-<span>({reviews.length})</span></h2>
        {reviews.length <= 0 && <div className="no-reviews-con">No Reviews </div>}

       {reviews.length>0 && 
       <div className="reviews-list-con">
        
 {reviews.map((review) =>(
              <div key={review._id} className="brewery-item">
                <p>@{review.name} <span className="span-elem"> date- {new Date(review.createdAt).toLocaleDateString()}</span></p>
                <p>Rating: {review.rating}</p>
                <p>Description: {review.description}</p>
                
              </div>
            ))}
        
        </div>
        
       }
       
      </div>
    </div>
  );
};

export default DetailBreweryPage;

import React from "react";
import { useNavigate } from "react-router-dom";

const BreweryItem = ({ brewery }) => {
  const navigate=useNavigate()

  const getDetailBrewery=()=>{
    
    navigate(`/detail-brewery/${brewery.id}`);

  }





  return (
    <div className="brewery-item" onClick={()=>getDetailBrewery(brewery)}>
      <li  className="">
        Name:
        {brewery.name}
      </li>

      <li className="">
        City:
        {brewery.city}
      </li>
      <li className="">
        Website:
        {brewery.website_url}
      </li>
    </div>
  );
};

export default BreweryItem;

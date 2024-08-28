// src/components/VendorCard/index.js
import React, { useState } from 'react';
import './index.css';

const VendorCard = ({ vendor }) => {
  const [showMore, setShowMore] = useState(false);

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="vendor-card">
      <div className="vendor-content">
        <img src={vendor.photo} alt={vendor.name} className="vendor-photo" />
        <div className="vendor-details">
          <h3>{vendor.name}</h3>
          <p><strong>Specialization:</strong> {vendor.specialization}</p>
          <p><strong>Rating:</strong> {vendor.rating} / 5</p>
          <p><strong>Repairing Items:</strong> {vendor.repairingItems}</p>
          <p><strong>Location:</strong> {vendor.location}</p>
          <p><strong>Available Towns:</strong> {vendor.availableTown}</p>
          <button onClick={handleReadMore} className="read-more-btn">
            {showMore ? 'Show Less' : 'Read More'}
          </button>
          <div className={`vendor-description ${showMore ? 'expanded' : ''}`}>
            {showMore && <p>{vendor.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;

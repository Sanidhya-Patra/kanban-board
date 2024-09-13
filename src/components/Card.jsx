// src/components/Card.jsx
import React from 'react';
import '../styles/Card.css';

const Card = ({ title, description, type, priority, userName }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-type">{type}</div>
      
      <div className="avatar">{userName ? userName[4] : 'N/A'}</div>

      <div className="priority">
      </div>
    </div>
  );
};

export default Card;

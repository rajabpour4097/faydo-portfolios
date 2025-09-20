import React from 'react';
import './BusinessCard.css';

interface VipExperience {
  stars: number;
  experience: string;
}

interface PackageInfo {
  totalMonths: number;
  remainingMonths: number;
}

interface BusinessCardProps {
  businessName: string;
  discount?: string;
  productDiscount?: string;
  conditionalOffer: string;
  vipExperiences: VipExperience[];
  packageInfo: PackageInfo;
  rating: number;
  category: string;
  location: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  businessName,
  discount,
  productDiscount,
  conditionalOffer,
  vipExperiences,
  packageInfo,
  rating,
  category,
  location
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return stars;
  };

  // Removed unused progressPercentage calculation.

  // Note: progress status function removed as it wasn't used; can be reintroduced if needed in UI.

  return (
    <div className="modern-business-card">
      {/* Header Section */}
      <div className="card-header-new">
        <div className="business-info">
          <h2 className="business-name">{businessName}</h2>
          <span className="category-text">{category}</span>
          <span className="location-text">{location}</span>
        </div>
        <div className="discount-badges">
          {discount && (
            <div className="discount-badge primary">
              {discount}
            </div>
          )}
          {productDiscount && (
            <div className="discount-badge secondary">
              {productDiscount}
            </div>
          )}
        </div>
      </div>

      {/* Offer and Rating Container */}
      <div className="offer-rating-container">
        {/* Rating Section */}
        <div className="rating-section">
          <div className="stars-new">
            {renderStars(rating)}
          </div>
        </div>

        {/* Conditional Offer */}
        <div className="conditional-offer">
          <span className="discount-icon">🎁</span>
          <span className="offer-text">{conditionalOffer}</span>
        </div>
      </div>

    </div>
  );
};

export default BusinessCard;
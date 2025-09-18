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

  const progressPercentage = packageInfo.remainingMonths > 0 
    ? ((packageInfo.totalMonths - packageInfo.remainingMonths) / packageInfo.totalMonths) * 100
    : 100;

  const getProgressStatus = () => {
    if (packageInfo.remainingMonths === 0) return 'تکمیل شده';
    if (progressPercentage >= 75) return 'در حال انجام';
    if (progressPercentage >= 50) return 'میانی';
    return 'شروع شده';
  };

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

      {/* Conditional Offer */}
      <div className="conditional-offer">
        <span className="discount-icon">🎁</span>
        <span className="offer-text">{conditionalOffer}</span>
      </div>

      {/* VIP Experiences */}
      <div className="vip-section-new">
        <div className="vip-header">
          <span className="vip-crown">👑</span>
          <span className="vip-title">تجربیات VIP</span>
        </div>
        <div className="vip-experiences">
          {vipExperiences.map((exp, index) => (
            <div key={index} className="vip-experience">
              <div className="vip-stars">
                {Array.from({ length: exp.stars }, (_, i) => (
                  <span key={i} className="vip-star">★</span>
                ))}
              </div>
              <span className="vip-text">{exp.experience}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Section */}
      <div className="rating-section">
        <span className="rating-value-new">{rating}/5.0</span>
        <div className="stars-new">
          {renderStars(rating)}
        </div>
      </div>

      {/* Package Progress */}
      <div className="package-progress">
        <div className="progress-header">
          <span className="progress-title">📅 زمان بسته</span>
          <span className="progress-months">
            {packageInfo.totalMonths - packageInfo.remainingMonths}/{packageInfo.totalMonths} ماه باقی‌مانده
          </span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-status">
          {packageInfo.remainingMonths === 0 ? 'این ماه منقضی می‌شود' : `${packageInfo.remainingMonths} ماه باقی‌مانده`}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
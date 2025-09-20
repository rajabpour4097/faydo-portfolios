import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const sections = [
    {
      id: 'business-cards',
      title: 'کارت‌های کسب و کار',
      description: 'مشاهده کارت‌های مختلف کسب و کارها با امکانات VIP',
      icon: '💼',
      path: '/business-cards'
    },
    {
      id: 'shops',
      title: 'صفحه فروشگاه‌ها',
      description: 'مشاهده صفحه فروشگاه‌های آنلاین',
      icon: '🏪',
      path: '/shops'
    },
    {
      id: 'services',
      title: 'دریافت اطلاعات تخفیف کسب و کار',
      description: 'ثبت نام برای دریافت اطلاعات تخفیف‌های جدید کسب و کارها',
      icon: '�',
      path: '/discount-info'
    },
    {
      id: 'signup',
      title: 'ثبت نام',
      description: 'مشاهده ثبت نام مشتری و کسب وکارها',
      icon: '📝',
      path: '/signup'
    },
    {
      id: 'professionals',
      title: 'کارت متخصصان',
      description: 'مشاهده کارت‌های افراد متخصص در زمینه‌های مختلف',
      icon: '👨‍💼',
      path: '/professionals'
    },
    {
      id: 'education',
      title: 'کارت آموزشی',
      description: 'مشاهده کارت‌های مراکز آموزشی و مدرسان',
      icon: '📚',
      path: '/education'
    }
  ];

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">نمونه کارت‌های کسب و کار</h1>
          <p className="hero-subtitle">
            مجموعه‌ای از طراحی‌های مختلف کارت‌های کسب و کار برای ارائه و بررسی
          </p>
        </div>
      </header>

      <main className="main-content">
        <div className="sections-grid">
          {sections.map((section) => (
            <Link 
              key={section.id} 
              to={section.path} 
              className="section-card"
            >
              <div className="section-icon">{section.icon}</div>
              <h3 className="section-title">{section.title}</h3>
              <p className="section-description">{section.description}</p>
              <div className="section-arrow">←</div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>ساخته شده با ❤️ برای ارائه و نمایش</p>
      </footer>
    </div>
  );
};

export default HomePage;
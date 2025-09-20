import React from 'react';
import { Link } from 'react-router-dom';
import { shops } from '../data/shops';
import './ShopsPage.css';

const ShopsPage: React.FC = () => {
  return (
    <div className="shops" dir="rtl">
      <h1>کارت فروشگاه‌ها</h1>
      <div className="grid">
        {shops.map(s => (
          <Link to={`/shops/${s.id}`} key={s.id} className="shop-card">
            <div className="title-row">
              <h3>{s.name}</h3>
              <span className="badge">{s.activePackage}</span>
            </div>
            <div className="meta">
              <span>{s.category}</span>
              <span>ساعت کاری: {s.hours.start} تا {s.hours.end}</span>
              <span>{s.address}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopsPage;

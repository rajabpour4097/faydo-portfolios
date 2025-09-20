import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shops, Shop, ShopComment } from '../data/shops';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import './ShopDetailPage.css';

const Star: React.FC<{ filled: boolean; onClick?: () => void }> = ({ filled, onClick }) => (
  <span onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', color: filled ? '#f59e0b' : '#cbd5e1', fontSize: '20px' }}>★</span>
);

const average = (arr: number[]) => (arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length) : 0);

const ShopDetailPage: React.FC = () => {
  const { id } = useParams();
  const initialShop = useMemo(() => {
    if (id) return shops.find(s => s.id === id) as Shop | undefined;
    return shops[0]; // fallback to first shop when used at /shops
  }, [id]);
  const [shop, setShop] = useState<Shop | undefined>(initialShop);
  const [myRating, setMyRating] = useState<number>(0);
  const [myComment, setMyComment] = useState<string>('');

  if (!shop) {
    return (
      <div className="shop-detail" dir="rtl">
        <p>فروشگاه پیدا نشد.</p>
        <Link to="/shops" className="link">بازگشت</Link>
      </div>
    );
  }

  const avg = average(shop.ratings);

  const submitRating = (r: number) => {
    setMyRating(r);
    setShop(prev => prev ? { ...prev, ratings: [...prev.ratings, r] } : prev);
  };

  const submitComment = () => {
    if (!myComment.trim()) return;
    const newComment: ShopComment = { id: 'c' + (shop.comments.length + 1), user: 'شما', text: myComment.trim(), likes: 0, likedByMe: false };
    setShop(prev => prev ? { ...prev, comments: [newComment, ...prev.comments] } : prev);
    setMyComment('');
  };

  const toggleLike = (cid: string) => {
    setShop(prev => prev ? {
      ...prev,
      comments: prev.comments.map(c => c.id === cid ? { ...c, likedByMe: !c.likedByMe, likes: c.likes + (c.likedByMe ? -1 : 1) } : c)
    } : prev);
  };

  return (
    <div className="shop-detail" dir="rtl">
      <div className="header-row">
        <Link to="/shops" className="link">بازگشت</Link>
        <h1>{shop.name}</h1>
      </div>
      <div className="grid">
        <div className="info">
          <div className="row"><strong>دسته‌بندی:</strong> {shop.category}</div>
          <div className="row"><strong>تلفن:</strong> {shop.phone}</div>
          <div className="row"><strong>ساعت کاری:</strong> {shop.hours.start} تا {shop.hours.end}</div>
          <div className="row"><strong>آدرس:</strong> {shop.address}</div>
          <div className="row"><strong>استان/شهر:</strong> {shop.province || '—'} {shop.city ? `- ${shop.city}` : ''}</div>
          <div className="map">
            <MapContainer center={[shop.location.lat, shop.location.lng]} zoom={14} scrollWheelZoom style={{ height: 260, width: '100%', borderRadius: 12 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[shop.location.lat, shop.location.lng]} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', iconAnchor: [12, 41] })} />
            </MapContainer>
          </div>
        </div>
        <div className="package">
          <div className="pkg-header">
            <span className="tier">{shop.activePackage}</span>
            <div className="avg">میانگین امتیاز: {avg.toFixed(1)} / 5</div>
          </div>
          <p className="desc">{shop.packageDescription}</p>
          <ul className="perks">
            {shop.perks.map(p => <li key={p}>• {p}</li>)}
          </ul>
          <div className="rate">
            <div>امتیاز شما:</div>
            {[1,2,3,4,5].map(n => (
              <Star key={n} filled={n <= (myRating || Math.round(avg))} onClick={() => submitRating(n)} />
            ))}
          </div>
        </div>
      </div>

      <div className="comments">
        <h2>نظرات کاربران</h2>
        <div className="new-comment">
          <textarea value={myComment} onChange={e => setMyComment(e.target.value)} placeholder="نظر خود را بنویسید... (هر کاربر یک نظر)" rows={3} />
          <button onClick={submitComment}>ارسال نظر</button>
        </div>
        <ul>
          {shop.comments.map(c => (
            <li key={c.id} className="comment">
              <div className="meta"><strong>{c.user}</strong></div>
              <div className="text">{c.text}</div>
              <button className={c.likedByMe ? 'like liked' : 'like'} onClick={() => toggleLike(c.id)}>
                ♥ {c.likes}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopDetailPage;

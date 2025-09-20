import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shops, Shop, ShopComment } from '../data/shops';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import './ShopDetailPage.css';

const Star: React.FC<{ filled: boolean; onClick?: () => void }> = ({ filled, onClick }) => (
  <span onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', color: filled ? '#f59e0b' : '#cbd5e1', fontSize: '20px' }}>★</span>
);

const average = (arr: number[]) => (arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length) : 0);

const renderStars = (value: number) => {
  const full = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < full; i++) nodes.push(<span key={`f${i}`} className="star full">★</span>);
  if (hasHalf && full < 5) nodes.push(<span key="h" className="star half">★</span>);
  for (let i = nodes.length; i < 5; i++) nodes.push(<span key={`e${i}`} className="star empty">☆</span>);
  return nodes;
};

const ShopDetailPage: React.FC = () => {
  const { id } = useParams();
  const initialShop = useMemo(() => (id ? shops.find(s => s.id === id) : shops[0]) as Shop | undefined, [id]);
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
    setShop(prev => (prev ? { ...prev, ratings: [...prev.ratings, r] } : prev));
  };

  const submitComment = () => {
    if (!myComment.trim()) return;
    const newComment: ShopComment = { id: 'c' + (shop.comments.length + 1), user: 'شما', text: myComment.trim(), likes: 0, likedByMe: false };
    setShop(prev => (prev ? { ...prev, comments: [newComment, ...prev.comments] } : prev));
    setMyComment('');
  };

  const toggleLike = (cid: string) => {
    setShop(prev => (prev ? { ...prev, comments: prev.comments.map(c => (c.id === cid ? { ...c, likedByMe: !c.likedByMe, likes: c.likes + (c.likedByMe ? -1 : 1) } : c)) } : prev));
  };

  return (
    <div className="shop-detail" dir="rtl">
      {/* Cover and profile */}
      <div className="cover" style={{ backgroundImage: `url(${shop.coverUrl || ''})` }} />
      <div className="topbar">
        <Link to="/shops" className="link">بازگشت</Link>
        <span className="badge tier">{shop.activePackage}</span>
      </div>
      <div className="profile">
        {shop.logoUrl && <img className="avatar" src={shop.logoUrl} alt={shop.name} />}
        <div className="who">
          <h1 className="title">{shop.name}</h1>
          <div className="subtitle">{shop.category}</div>
          <div className="stars-inline">
            <span className="stars-inline-row">{renderStars(avg)}</span>
            <span className="rating-num">{avg.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Business info */}
      <div className="biz-info">
        <div className="info-item">📍 {shop.address}</div>
        <div className="info-item">⏰ {shop.hours.start} — {shop.hours.end}</div>
        <a className="info-item" href={`tel:${shop.phone}`}>📞 {shop.phone}</a>
        {shop.website && (
          <a className="info-item" href={shop.website} target="_blank" rel="noopener">🌐 وب‌سایت</a>
        )}
      </div>

      {/* Offers section */}
      {shop.offers && shop.offers.length > 0 && (
        <div className="section">
          <h2 className="section-title">پیشنهادها</h2>
          <div className="cards">
            {shop.offers.map(o => (
              <div className={`offer-card ${o.type}`} key={o.title}>
                <div className="row-1">
                  <div className="offer-title">{o.title}</div>
                  <span className="chev">›</span>
                </div>
                {o.description && <div className="offer-desc">{o.description}</div>}
                <div className="offer-meta">
                  {o.expiresAt && <span className="expires">تا {new Date(o.expiresAt).toLocaleDateString('fa-IR')}</span>}
                  {typeof o.rating === 'number' && <span className="mini-stars">{renderStars(o.rating)}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main grid */}
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
              {(() => {
                const OpenGMapsOnClick: React.FC = () => {
                  useMapEvents({
                    click(e) {
                      const lat = e.latlng?.lat ?? shop.location.lat;
                      const lng = e.latlng?.lng ?? shop.location.lng;
                      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                      window.open(url, '_blank', 'noopener');
                    },
                  });
                  return null;
                };
                return <OpenGMapsOnClick />;
              })()}
            </MapContainer>
            <div className="hint">برای باز کردن موقعیت در Google Maps روی نقشه کلیک کنید</div>
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
            {[1, 2, 3, 4, 5].map(n => (
              <Star key={n} filled={n <= (myRating || Math.round(avg))} onClick={() => submitRating(n)} />
            ))}
          </div>
          {shop.satisfaction && (
            <div className="satisfaction">
              <div className="bar"><span>Discounts</span><div className="track"><div className="fill" style={{ width: `${Math.round(shop.satisfaction.discounts * 100)}%` }} /></div></div>
              <div className="bar"><span>Gifts</span><div className="track"><div className="fill orange" style={{ width: `${Math.round(shop.satisfaction.gifts * 100)}%` }} /></div></div>
              <div className="bar"><span>VIP</span><div className="track"><div className="fill purple" style={{ width: `${Math.round(shop.satisfaction.vip * 100)}%` }} /></div></div>
            </div>
          )}
          {typeof shop.daysRemaining === 'number' && (
            <div className="urgency">{shop.daysRemaining} روز تا پایان پکیج</div>
          )}
          <div className="ctas">
            <button className="btn primary">🎟️ استفاده از تخفیف</button>
            <button className="btn ghost">👑 درخواست VIP</button>
            <button className="btn ghost">🔔 دنبال کردن</button>
            <button className="btn ghost">❤️ علاقه‌مندی</button>
          </div>
        </div>
      </div>

      {/* Media gallery */}
      {shop.media && shop.media.length > 0 && (
        <div className="section">
          <h2 className="section-title">رسانه</h2>
          <div className="media-grid">
            {shop.media.map(m => (
              <div className="media-item" key={m.id}>
                {m.type === 'image' ? <img src={m.url} alt="media" /> : <video src={m.url} controls />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
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

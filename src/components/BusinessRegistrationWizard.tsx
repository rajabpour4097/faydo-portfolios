import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import iranProvinces, { Province } from '../data/iranProvinces';
import './BusinessRegistrationWizard.css';

interface Props { onExit: () => void }

type Step = 1 | 2 | 3;

const categories = ['رستوران و فست‌فود', 'کلینیک زیبایی', 'باشگاه ورزشی', 'خدمات خودرو'];

const BusinessRegistrationWizard: React.FC<Props> = ({ onExit }) => {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<'next' | 'back'>('next');

  const [form, setForm] = useState({
    address: '',
    workStart: '',
    workEnd: '',
    phone: '',
    category: categories[0],
    lat: 35.6892,
    lng: 51.389,
    province: '',
    city: '',
  });

  const cities: string[] = useMemo(() => {
    const found: Province | undefined = iranProvinces.find((p: Province) => p.name === form.province);
    return found ? found.cities : [];
  }, [form.province]);

  const goNext = () => { setDirection('next'); setStep(prev => ((prev + 1) > 3 ? 3 : (prev + 1)) as Step); };
  const goBack = () => { setDirection('back'); setStep(prev => ((prev - 1) < 1 ? 1 : (prev - 1)) as Step); };

  // Custom map click handler component to update coordinates
  const ClickHandler: React.FC = () => {
    useMapEvents({
      click(e) {
        setForm(prev => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng }));
      },
    });
    return null;
  };

  const tehranCenter: [number, number] = [form.lat, form.lng];

  return (
    <div className="wizard" dir="rtl">
      <div className="wizard-header">
        <button className="link" onClick={onExit}>بازگشت</button>
        <div className="steps">مرحله {step} از 3</div>
      </div>

      <div className={`slides ${direction}`}>
        {/* Step 1: Address & hours & phone & category */}
        {step === 1 && (
          <div className="slide">
            <h2>اطلاعات کسب‌وکار</h2>
            <label className="label">آدرس کسب‌وکار</label>
            <input className="input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="آدرس" />

            <div className="row">
              <div className="col">
                <label className="label">ساعت شروع</label>
                <input className="input" type="time" value={form.workStart} onChange={e => setForm({ ...form, workStart: e.target.value })} />
              </div>
              <div className="col">
                <label className="label">ساعت پایان</label>
                <input className="input" type="time" value={form.workEnd} onChange={e => setForm({ ...form, workEnd: e.target.value })} />
              </div>
            </div>

            <label className="label">تلفن تماس کسب‌وکار</label>
            <input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="0912xxxxxxx" />

            <label className="label">دسته‌بندی</label>
            <select className="select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="actions">
              <button className="btn" onClick={goNext}>تایید و ادامه</button>
            </div>
          </div>
        )}

        {/* Step 2: Map + province/city */}
        {step === 2 && (
          <div className="slide">
            <h2>موقعیت روی نقشه و استان/شهر</h2>
            <div className="map-wrapper">
              <MapContainer center={tehranCenter} zoom={12} scrollWheelZoom style={{ height: 300, width: '100%', borderRadius: 12 }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={tehranCenter} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', iconAnchor: [12, 41] })} />
                <ClickHandler />
              </MapContainer>
              <div className="coords">
                <span>عرض جغرافیایی: {form.lat.toFixed(6)}</span>
                <span>طول جغرافیایی: {form.lng.toFixed(6)}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="label">استان</label>
                <select className="select" value={form.province} onChange={e => setForm({ ...form, province: e.target.value, city: '' })}>
                  <option value="">انتخاب استان...</option>
                  {iranProvinces.map((p: Province) => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className="col">
                <label className="label">شهر</label>
                <select className="select" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} disabled={!form.province}>
                  <option value="">انتخاب شهر...</option>
                  {cities.map((c: string) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="actions spaced">
              <button className="btn secondary" onClick={goBack}>بازگشت</button>
              <button className="btn" onClick={goNext}>مرحله بعد</button>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="slide">
            <h2>مرور و تایید</h2>
            <div className="summary">
              <p><strong>آدرس:</strong> {form.address || '—'}</p>
              <p><strong>ساعت کاری:</strong> {form.workStart || '—'} تا {form.workEnd || '—'}</p>
              <p><strong>تلفن:</strong> {form.phone || '—'}</p>
              <p><strong>دسته‌بندی:</strong> {form.category}</p>
              <p><strong>استان/شهر:</strong> {form.province || '—'} {form.city ? `- ${form.city}` : ''}</p>
              <p><strong>مختصات:</strong> {form.lat.toFixed(6)}, {form.lng.toFixed(6)}</p>
            </div>
            <div className="actions spaced">
              <button className="btn secondary" onClick={goBack}>بازگشت</button>
              <button className="btn">ثبت نهایی</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessRegistrationWizard;

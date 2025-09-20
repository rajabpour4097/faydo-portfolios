import React, { useState } from 'react';
import './RegistrationPage.css';
import BusinessRegistrationWizard from '../components/BusinessRegistrationWizard';

type Role = 'customer' | 'business';

const RegistrationPage: React.FC = () => {
  const [role, setRole] = useState<Role>('customer');
  const [startBusinessWizard, setStartBusinessWizard] = useState(false);

  const [customerForm, setCustomerForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  if (startBusinessWizard) {
    return <BusinessRegistrationWizard onExit={() => setStartBusinessWizard(false)} />;
  }

  return (
    <div className="register-page" dir="rtl">
      <div className="register-header">
        <div className="avatar">F</div>
        <h1>ایجاد حساب کاربری</h1>
        <p className="subtitle">یا وارد حساب موجود شوید</p>
      </div>

      <div className="register-card">
        <div className="form-row">
          <label className="label">نوع حساب کاربری</label>
          <select
            className="select"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="customer">مشتری</option>
            <option value="business">کسب‌وکار</option>
          </select>
        </div>

        {role === 'customer' && (
          <>
            <div className="form-row">
              <label className="label">نام کاربری</label>
              <input
                className="input"
                placeholder="نام کاربری"
                value={customerForm.username}
                onChange={(e) => setCustomerForm({ ...customerForm, username: e.target.value })}
              />
            </div>

            <div className="form-row">
              <label className="label">ایمیل</label>
              <input
                className="input"
                placeholder="your@email.com"
                type="email"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
              />
            </div>

            <div className="form-row">
              <label className="label">رمز عبور</label>
              <input
                className="input"
                placeholder="••••••••"
                type="password"
                value={customerForm.password}
                onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
              />
            </div>

            <div className="form-row">
              <label className="label">تکرار رمز عبور</label>
              <input
                className="input"
                placeholder="رمز عبور را مجدداً وارد کنید"
                type="password"
                value={customerForm.confirmPassword}
                onChange={(e) => setCustomerForm({ ...customerForm, confirmPassword: e.target.value })}
              />
            </div>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={customerForm.agree}
                onChange={(e) => setCustomerForm({ ...customerForm, agree: e.target.checked })}
              />
              <span>با شرایط استفاده و حریم خصوصی موافقم</span>
            </label>

            <button className="btn-primary" disabled={!customerForm.agree}>ایجاد حساب کاربری</button>
          </>
        )}

        {role === 'business' && (
          <>
            <div className="form-row">
              <label className="label">نام کاربری</label>
              <input className="input" placeholder="نام کاربری" />
            </div>
            <div className="form-row">
              <label className="label">نام کسب‌وکار</label>
              <input className="input" placeholder="نام کسب‌وکار" />
            </div>
            <div className="form-row">
              <label className="label">ایمیل</label>
              <input className="input" type="email" placeholder="your@email.com" />
            </div>
            <div className="form-row">
              <label className="label">شماره همراه</label>
              <input className="input" placeholder="09123456789" />
            </div>
            <div className="form-row">
              <label className="label">رمز عبور</label>
              <input className="input" type="password" placeholder="••••••••" />
            </div>
            <div className="form-row">
              <label className="label">تکرار رمز عبور</label>
              <input className="input" type="password" placeholder="رمز عبور را مجدداً وارد کنید" />
            </div>
            <label className="checkbox">
              <input type="checkbox" />
              <span>با شرایط استفاده و حریم خصوصی موافقم</span>
            </label>
            <button className="btn-primary" onClick={() => setStartBusinessWizard(true)}>ثبت نام</button>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;

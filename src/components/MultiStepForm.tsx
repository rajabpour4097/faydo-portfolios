import React, { useState } from 'react';
import './MultiStepForm.css';

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Step 1 - Discount Section
    businessType: [] as string[],
    publicDiscountPercentage: '',
    specificTitle: '',
    specificDescription: '',
    specificPercentage: '',
    
    // Step 2 - Elite Gift
    giftAmount: '',
    giftCount: '',
    giftDescription: '',
    
    // Step 3 - VIP Selection
    oneStarFeatures: [] as string[],
    twoStarFeatures: [] as string[],
    threeStarFeatures: [] as string[],
    
    // Step 4 - Final
    duration: ''
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFeatureChange = (step: string, feature: string, checked: boolean) => {
    const fieldName = `${step}StarFeatures` as keyof typeof formData;
    const currentFeatures = formData[fieldName] as string[];

    if (checked && !currentFeatures.includes(feature)) {
      setFormData({
        ...formData,
        [fieldName]: [...currentFeatures, feature]
      });
    } else if (!checked) {
      setFormData({
        ...formData,
        [fieldName]: currentFeatures.filter(f => f !== feature)
      });
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('فرم با موفقیت ارسال شد!');
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="multi-step-form">
      <div className="form-header">
        <h1>🎁 دریافت اطلاعات تخفیف کسب و کار</h1>
        
        <div className="progress-indicator">
          <div className="step-info">
            <span>مرحله {currentStep} از {totalSteps}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="form-content">
        {/* مرحله 1: بخش تخفیف */}
        {currentStep === 1 && (
          <div className="step-content">
            <h2>بخش تخفیف</h2>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={formData.businessType.includes('public')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData, 
                        businessType: [...formData.businessType, 'public']
                      });
                    } else {
                      setFormData({
                        ...formData, 
                        businessType: formData.businessType.filter(type => type !== 'public'),
                        publicDiscountPercentage: ''
                      });
                    }
                  }}
                />
                تخفیف همگانی
              </label>
              
              {formData.businessType.includes('public') && (
                <div className="conditional-fields" style={{marginLeft: '30px', marginTop: '10px'}}>
                  <div className="form-group">
                    <label>درصد تخفیف همگانی:</label>
                    <input 
                      type="number" 
                      placeholder="مثال: 15"
                      min="0"
                      max="100"
                      value={formData.publicDiscountPercentage}
                      onChange={(e) => setFormData({...formData, publicDiscountPercentage: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={formData.businessType.includes('specific')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData, 
                        businessType: [...formData.businessType, 'specific']
                      });
                    } else {
                      setFormData({
                        ...formData, 
                        businessType: formData.businessType.filter(type => type !== 'specific'),
                        specificTitle: '',
                        specificDescription: '',
                        specificPercentage: ''
                      });
                    }
                  }}
                />
                تخفیف اختصاصی
              </label>

              {formData.businessType.includes('specific') && (
                <div className="conditional-fields" style={{marginLeft: '30px', marginTop: '10px'}}>
                  <div className="form-group">
                    <label>عنوان تخفیف:</label>
                    <input 
                      type="text" 
                      placeholder="مثال: تخفیف ویژه مشتریان VIP"
                      value={formData.specificTitle}
                      onChange={(e) => setFormData({...formData, specificTitle: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>توضیحات تخفیف:</label>
                    <textarea 
                      placeholder="شرح کامل تخفیف و شرایط آن..."
                      value={formData.specificDescription}
                      onChange={(e) => setFormData({...formData, specificDescription: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>درصد تخفیف:</label>
                    <input 
                      type="number" 
                      placeholder="مثال: 20"
                      min="0"
                      max="100"
                      value={formData.specificPercentage}
                      onChange={(e) => setFormData({...formData, specificPercentage: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="btn-next" onClick={handleNext}>
                مرحله بعد
              </button>
            </div>
          </div>
        )}

        {/* مرحله 2: هدایای VIP */}
        {currentStep === 2 && (
          <div className="step-content">
            <h2>هدایای کاربران وفادار</h2>
            
            <div className="form-group">
              <label>مبلغ کل خرید:</label>
              <input 
                type="number" 
                placeholder="مبلغ کل خرید را وارد کنید"
                value={formData.giftAmount}
                onChange={(e) => setFormData({...formData, giftAmount: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>تعداد خرید:</label>
              <input 
                type="number" 
                placeholder="تعداد دفعات خرید را وارد کنید"
                value={formData.giftCount}
                onChange={(e) => setFormData({...formData, giftCount: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>هدیه:</label>
              <textarea 
                placeholder="توضیحات کامل هدیه را وارد کنید"
                value={formData.giftDescription}
                onChange={(e) => setFormData({...formData, giftDescription: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-back" onClick={handleBack}>
                مرحله قبل
              </button>
              <button type="button" className="btn-next" onClick={handleNext}>
                مرحله بعد
              </button>
            </div>
          </div>
        )}

        {/* مرحله 3: انتخاب VIP */}
        {currentStep === 3 && (
          <div className="step-content">
            <h2>انتخاب VIP</h2>
            
            <div className="vip-frames">
              {/* فریم یک ستاره */}
              <div className="vip-frame">
                <div className="frame-header">
                  <span className="star">⭐</span>
                  <h3>پایه</h3>
                </div>
                <div className="features-list">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={formData.oneStarFeatures.includes('discount')}
                      onChange={(e) => handleFeatureChange('one', 'discount', e.target.checked)}
                    />
                    تخفیف ویژه
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={formData.oneStarFeatures.includes('priority')}
                      onChange={(e) => handleFeatureChange('one', 'priority', e.target.checked)}
                    />
                    اولویت خدمات
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={formData.oneStarFeatures.includes('notification')}
                      onChange={(e) => handleFeatureChange('one', 'notification', e.target.checked)}
                    />
                    اطلاع‌رسانی ویژه
                  </label>
                </div>
              </div>

              {/* فریم دو ستاره */}
              <div className="vip-frame">
                <div className="frame-header">
                  <span className="stars">⭐⭐</span>
                  <h3>نقره‌ای</h3>
                </div>
                <div className="features-list">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={formData.twoStarFeatures.includes('exclusive')}
                      onChange={(e) => handleFeatureChange('two', 'exclusive', e.target.checked)}
                    />
                    محصولات انحصاری
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={formData.twoStarFeatures.includes('support')}
                      onChange={(e) => handleFeatureChange('two', 'support', e.target.checked)}
                    />
                    پشتیبانی 24/7
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={formData.twoStarFeatures.includes('shipping')}
                      onChange={(e) => handleFeatureChange('two', 'shipping', e.target.checked)}
                    />
                    ارسال رایگان
                  </label>
                </div>
              </div>

            </div>

            <div className="form-actions">
              <button type="button" className="btn-back" onClick={handleBack}>
                مرحله قبل
              </button>
              <button type="button" className="btn-next" onClick={handleNext}>
                مرحله بعد
              </button>
            </div>
          </div>
        )}

        {/* مرحله 4: تایید نهایی */}
        {currentStep === 4 && (
          <div className="step-content">
            <h2>تایید نهایی</h2>
            
            <div className="form-group">
              <label>مدت زمان طرح:</label>
              <select 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  color: '#374151',
                  fontFamily: 'inherit'
                }}
              >
                <option value="">انتخاب کنید...</option>
                <option value="3months">3 ماهه</option>
                <option value="6months">6 ماهه</option>
                <option value="9months">9 ماهه</option>
                <option value="12months">12 ماهه</option>
              </select>
            </div>

            <div className="form-group">
              <h3>خلاصه انتخاب‌های شما:</h3>
              <div style={{background: '#f8fafc', padding: '20px', borderRadius: '12px', marginTop: '15px'}}>
                <p><strong>انواع تخفیف:</strong> {formData.businessType.join(', ') || 'انتخاب نشده'}</p>
                {formData.publicDiscountPercentage && (
                  <p><strong>درصد تخفیف همگانی:</strong> {formData.publicDiscountPercentage}%</p>
                )}
                {formData.specificTitle && (
                  <p><strong>عنوان تخفیف اختصاصی:</strong> {formData.specificTitle}</p>
                )}
                {formData.specificDescription && (
                  <p><strong>توضیحات تخفیف اختصاصی:</strong> {formData.specificDescription}</p>
                )}
                {formData.specificPercentage && (
                  <p><strong>درصد تخفیف اختصاصی:</strong> {formData.specificPercentage}%</p>
                )}
                <p><strong>هدایای VIP:</strong> {formData.giftDescription || 'وارد نشده'}</p>
                <p><strong>ویژگی‌های یک ستاره:</strong> {formData.oneStarFeatures.join(', ') || 'انتخاب نشده'}</p>
                <p><strong>ویژگی‌های دو ستاره:</strong> {formData.twoStarFeatures.join(', ') || 'انتخاب نشده'}</p>
                <p><strong>ویژگی‌های سه ستاره:</strong> {formData.threeStarFeatures.join(', ') || 'انتخاب نشده'}</p>
                <p><strong>مدت زمان طرح:</strong> {
                  formData.duration === '3months' ? '3 ماهه' :
                  formData.duration === '6months' ? '6 ماهه' :
                  formData.duration === '9months' ? '9 ماهه' :
                  formData.duration === '12months' ? '12 ماهه' :
                  'انتخاب نشده'
                }</p>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-back" onClick={handleBack}>
                مرحله قبل
              </button>
              <button type="button" className="btn-submit" onClick={handleSubmit}>
                ✅ ارسال نهایی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
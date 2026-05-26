import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface FormField {
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

interface BookingFormProps {
  title: string;
  subtitle?: string;
  fields: FormField[];
  submitText?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ title, subtitle, fields, submitText = "提交预约" }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          formData,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit form:', result.message);
        alert(`提交失败: ${result.message || '未知错误'}\n请检查后端配置或联系管理员。`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('网络错误，请稍后再试。');
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 text-center shadow-xl border border-brand-gold/20 max-w-2xl mx-auto"
      >
        <CheckCircle2 className="h-16 w-16 text-brand-gold mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-brand-navy mb-4">
          预约提交成功
          <span className="block text-lg opacity-60 font-light mt-1">Booking Submitted Successfully</span>
        </h3>
        <p className="text-slate-600 mb-8">
          感谢您的预约，我们的工作人员将尽快与您联系并确认详情。
          <span className="block text-sm opacity-60 mt-2">Thank you for your booking. Our staff will contact you shortly to confirm details.</span>
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-outline flex flex-col items-center justify-center px-12 py-3"
        >
          <span>返回</span>
          <span className="text-[10px] opacity-60 uppercase tracking-widest mt-0.5">Return</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 shadow-2xl border border-brand-gold/10 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-brand-navy mb-2">{title}</h2>
        {subtitle && <p className="text-slate-500 italic">{subtitle}</p>}
        <div className="w-12 h-1 bg-brand-gold mx-auto mt-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-xs uppercase tracking-widest text-brand-navy font-bold mb-2">
                {field.label} {field.required && <span className="text-brand-red">*</span>}
                <span className="block text-[8px] opacity-60 font-light mt-0.5 tracking-widest">
                  {field.label === '姓名' ? 'FULL NAME' : 
                   field.label === '联系电话' ? 'PHONE NUMBER' : 
                   field.label === '预约类型' ? 'APPOINTMENT TYPE' : 
                   field.label === '备注信息' ? 'ADDITIONAL INFO' : 
                   field.label.toUpperCase()}
                </span>
              </label>
              
              {field.type === 'select' ? (
                <select
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full bg-brand-cream border border-brand-gold/20 px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
                >
                  <option value="">请选择 / Please Select</option>
                  {field.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  required={field.required}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  rows={4}
                  className="w-full bg-brand-cream border border-brand-gold/20 px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full bg-brand-cream border border-brand-gold/20 px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
                />
              )}
            </div>
          ))}
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full btn-primary py-4 text-base flex flex-col items-center justify-center">
            <span>{submitText}</span>
            <span className="text-[10px] opacity-60 uppercase tracking-widest mt-1">
              {submitText === '提交预约' ? 'SUBMIT APPOINTMENT' : 'SUBMIT'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

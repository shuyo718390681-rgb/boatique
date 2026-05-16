import React, { useState } from 'react';

interface FormData {
  name: string;
  contact: string;
  appointmentType: string;
  voyage: string;
  cabin: string;
  message: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    appointmentType: 'master_talk',
    voyage: '',
    cabin: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          contact: '',
          appointmentType: 'master_talk',
          voyage: '',
          cabin: '',
          message: '',
        });
      } else {
        throw new Error(data.error || '提交失败，请稍后重试');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-serif mb-6 text-center">活动预约</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">联系方式（手机/邮箱/微信）*</label>
          <input
            type="text"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">预约类型 *</label>
          <select
            name="appointmentType"
            required
            value={formData.appointmentType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="master_talk">大师讲堂</option>
            <option value="custom_tailoring">旗袍高定咨询</option>
            <option value="jewelry_tasting">珠宝品鉴</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">邮轮船期/航次</label>
          <input
            type="text"
            name="voyage"
            value={formData.voyage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">舱号</label>
          <input
            type="text"
            name="cabin"
            value={formData.cabin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">备注/需求</label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition disabled:opacity-50"
        >
          {status === 'loading' ? '提交中...' : '提交预约'}
        </button>
        {status === 'success' && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md">预约已提交，我们会尽快与您联系。</div>
        )}
        {status === 'error' && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">{errorMsg}</div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;

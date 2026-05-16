import React, { useState } from 'react';
import { motion } from 'motion/react';

const CorporateServices: React.FC = () => {
  const [formData, setFormData] = useState({
    company: '',
    contactPerson: '',
    phone: '',
    email: '',
    requirement: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          company: '',
          contactPerson: '',
          phone: '',
          email: '',
          requirement: '',
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
    <div className="bg-brand-cream min-h-screen py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="editorial-title text-brand-navy text-5xl md:text-6xl mb-4">企业合作</h1>
          <p className="text-brand-ink/60 text-lg max-w-2xl mx-auto">
            舶物志诚邀品牌方、机构及合作伙伴携手共进。
            请填写以下信息，我们将尽快与您联系。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">公司名称 *</label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系人 *</label>
              <input
                type="text"
                name="contactPerson"
                required
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系电话 *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱 *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">合作需求 / 留言 *</label>
              <textarea
                name="requirement"
                rows={5}
                required
                value={formData.requirement}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-brand-gold text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition disabled:opacity-50 font-medium"
            >
              {status === 'loading' ? '提交中...' : '提交合作意向'}
            </button>
            {status === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg">您的合作意向已提交，我们会尽快与您联系。</div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">{errorMsg}</div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CorporateServices;

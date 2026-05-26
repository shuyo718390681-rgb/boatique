import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const CorporateServices: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fields = [
    { label: '企业名称', name: 'companyName', type: 'text' as const, required: true, placeholder: '请输入您的企业全称 / Please enter company name' },
    { label: '联系人', name: 'contactPerson', type: 'text' as const, required: true, placeholder: '请输入联系人姓名 / Please enter contact name' },
    { label: '联系方式', name: 'contactInfo', type: 'text' as const, required: true, placeholder: '手机号或企业邮箱 / Phone or Email' },
    { 
      label: '需求类型', 
      name: 'serviceType', 
      type: 'select' as const, 
      required: true, 
      options: ['企业合作 / Corporate Partnership', '企业集采 / Bulk Procurement', '品牌联名 / Brand Collaboration', '其他 / Other'] 
    },
    { label: '需求详情', name: 'message', type: 'textarea' as const, required: true, placeholder: '请简要描述您的合作需求或集采意向 / Please describe your needs' },
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header Section */}
      <section className="min-h-[80vh] bg-brand-navy text-white overflow-hidden relative flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Corporate Background" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(10,20,47,0.8)]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="editorial-label !text-brand-gold">Corporate Services</span>
            <h1 className="editorial-title !text-white !text-5xl md:!text-7xl mb-12">
              企业合作与集采
              <span className="block text-2xl md:text-3xl opacity-60 font-light mt-4 tracking-normal">Corporate Partnerships & Procurement</span>
            </h1>
            <p className="text-xl font-light text-white/70 leading-relaxed mb-12">
              我们为企业客户提供专业的集采服务、品牌联名以及员工福利定制。让匠心艺术成为企业文化的独特注脚。
              <span className="block text-base opacity-60 mt-4">We provide professional procurement services, brand collaborations, and customized employee benefits for corporate clients. Let craftsmanship become a unique footnote to your corporate culture.</span>
            </p>
            <button 
              onClick={scrollToForm}
              className="group flex items-center gap-4 bg-brand-gold text-white px-10 py-5 rounded-sm font-bold tracking-[0.3em] uppercase text-sm hover:bg-white hover:text-brand-navy transition-all duration-500 shadow-xl"
            >
              <div className="flex flex-col items-start leading-tight">
                <span>填写信息</span>
                <span className="text-[10px] opacity-70 tracking-widest">Inquiry Form</span>
              </div>
              <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <div ref={formRef} className="py-32 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <BookingForm 
              title="企业客户需求登记" 
              subtitle="Corporate Inquiry Registration"
              fields={fields} 
              submitText="提交需求"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CorporateServices;

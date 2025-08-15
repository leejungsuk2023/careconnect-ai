import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Input from './Input';
import Card from './Card';
import { demoApi, DemoRequest } from '../services/api';
import { cn } from '../utils/cn';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoRequestModal: React.FC<DemoRequestModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<DemoRequest>({
    name: '',
    hospitalName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<DemoRequest>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<DemoRequest> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }
    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = '병원명을 입력해주세요.';
    }
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (!/^[\d-+\s()]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      await demoApi.requestDemo(formData);
      setStatus('success');
      setFormData({
        name: '',
        hospitalName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      console.error('Demo request error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof DemoRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setStatus('idle');
      setErrors({});
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card variant="elevated" className="relative">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-green/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      데모 신청이 완료되었습니다!
                    </h3>
                    <p className="text-text-secondary mb-6">
                      담당자가 곧 연락드리겠습니다.
                      평균 응답 시간은 2시간 이내입니다.
                    </p>
                    <Button variant="primary" onClick={handleClose}>
                      확인
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-text-primary mb-2">
                        무료 데모 신청
                      </h2>
                      <p className="text-text-secondary">
                        CareConnect AI의 강력한 기능을 직접 체험해보세요
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        label="담당자 이름"
                        type="text"
                        placeholder="홍길동"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        error={errors.name}
                        icon={
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        }
                      />

                      <Input
                        label="병원/클리닉명"
                        type="text"
                        placeholder="서울대학교병원"
                        value={formData.hospitalName}
                        onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                        error={errors.hospitalName}
                        icon={
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        }
                      />

                      <Input
                        label="이메일"
                        type="email"
                        placeholder="example@hospital.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        error={errors.email}
                        icon={
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        }
                      />

                      <Input
                        label="연락처"
                        type="tel"
                        placeholder="010-1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        error={errors.phone}
                        icon={
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        }
                      />

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          추가 메시지 (선택사항)
                        </label>
                        <textarea
                          className={cn(
                            'w-full px-4 py-2.5 bg-background-secondary border border-border-primary rounded-lg',
                            'text-text-primary placeholder:text-text-muted',
                            'focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20',
                            'transition-all duration-200 resize-none'
                          )}
                          rows={3}
                          placeholder="관심 있는 기능이나 궁금한 점을 알려주세요"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                        />
                      </div>

                      {status === 'error' && (
                        <div className="p-3 bg-accent-red/10 border border-accent-red/20 rounded-lg text-accent-red text-sm">
                          오류가 발생했습니다. 다시 시도해 주세요.
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="secondary"
                          size="lg"
                          fullWidth
                          onClick={handleClose}
                          disabled={isLoading}
                        >
                          취소
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          fullWidth
                          loading={isLoading}
                          disabled={isLoading}
                        >
                          {isLoading ? '전송 중...' : '데모 신청하기'}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DemoRequestModal;
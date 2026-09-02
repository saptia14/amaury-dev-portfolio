import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MobilePreloader = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-[rgb(var(--background-end-rgb))] flex items-center justify-center z-50">
      <div className="text-center">
        {/* Simple spinner - no heavy animations */}
        <div className="w-8 h-8 border-2 border-neutral-800 border-t-primary-500 rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-neutral-400 text-sm">{t('common.loading')}</p>
      </div>
    </div>
  );
});

MobilePreloader.displayName = 'MobilePreloader';

export default MobilePreloader;

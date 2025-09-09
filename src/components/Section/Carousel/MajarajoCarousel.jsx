import GenericCarousel from './GenericCarousel';
import { tours } from '@/components/data/tours/Tours';

const MajarajoCarousel = () => {
  return (
    <GenericCarousel
      title={
        <>
          آغاز <span className="animate-gradient-text">ماجراجویی</span> اینجاست
        </>
      }
      subtitle="تورهای گروهی داریس، تجربه‌ای ناب از سفر"
      data={tours}
    />
  );
};

export default MajarajoCarousel;
import GenericCarousel from './GenericCarousel';
import { tours } from '@/components/data/tours/Tours';

const PremiumCarousel = () => {
  return (
    <GenericCarousel
      title={
        <>
          اقامتگاه های <span className='animate-gradient-text'> محبوب ما </span>
        </>
      }
      subtitle="در این قسمت اقامتگاه های زیبا را ببینید"
      data={tours}
    />
  );
};

export default PremiumCarousel;
import { FC, useEffect, useState } from 'react';
import TimelineEvent from './TimelineEvent';
import { timelineData } from '../../../data';

export const TimelineSection: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={`${isMobile ? '' : 'p-8'}`}>
      <div className={`${isMobile ? 'max-w-full mt-4' : 'max-w-4xl mx-auto mt-8'}`}>
        {
          timelineData.map((item, index) => (
            <TimelineEvent key={index} {...item} isMobile={isMobile} />
          ))
        }
      </div >
    </section >
  )
}

// export default TimelineSection;
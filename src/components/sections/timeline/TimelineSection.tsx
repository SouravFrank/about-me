import { FC } from 'react';
import TimelineEvent from './TimelineEvent';
import { timelineData } from '../../../data';
import { sectionData } from '../../../data/sectionData';

export const TimelineSection: FC = () => (
  <section className="py-20 px-8">
    <h2 className="text-3xl font-bold text-center mb-12">
      {sectionData.timeline.titleBold}
      {sectionData.timeline.titleLight}
    </h2>
    <div className="max-w-4xl mx-auto">
      {timelineData.map((item, index) => (
        <TimelineEvent key={index} {...item} index={index} />
      ))}
    </div>
  </section>
);

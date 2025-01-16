import { FC } from 'react';
import TimelineEvent from './TimelineEvent';
import { timelineData } from '../../../data';

export const TimelineSection: FC = () => (
  <section className="px-8">
    <div className="max-w-4xl mx-auto">
      {timelineData.map((item, index) => (
        <TimelineEvent key={index} {...item} />
      ))}
    </div>
  </section>
);

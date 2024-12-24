import { FC } from 'react';
import TimelineEvent from "./TimelineEvent";
import { timelineData } from '../../../data';
import { TimelineItem } from './types';

export const TimelineSection: FC = () => (
  <section className="py-20 px-8">
    <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
    <div className="max-w-4xl mx-auto">
      {timelineData.map((item: TimelineItem, index: number) => (
        <TimelineEvent
          key={index}
          type={item.type}
          {...item}
          index={index}
        />
      ))}
    </div>
  </section>
); 
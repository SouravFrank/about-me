import { timelineBornEducation } from '../data/timelineBornEducation';
import { timelineCourses } from '../data/timelineCourses';
import { timelineAchievements } from '../data/timelineAchievements';
import TimelineEvent from './TimelineEvent';

export default function Timeline() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Born & Education</h2>
      {timelineBornEducation.map((event, index) => (
        <TimelineEvent key={index} index={index} {...event} />
      ))}

      <h2 className="text-2xl font-bold mb-4 mt-8">Courses</h2>
      {timelineCourses.map((event, index) => (
        <TimelineEvent key={index} index={index} {...event} />
      ))}

      <h2 className="text-2xl font-bold mb-4 mt-8">Achievements</h2>
      {timelineAchievements.map((event, index) => (
        <TimelineEvent key={index} index={index} {...event} />
      ))}
    </div>
  );
} 
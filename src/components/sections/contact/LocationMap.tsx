import { mapURI } from '../../../config';
import { LocationMapProps } from './types'; // Import the LocationMapProps interface

export const LocationMap: React.FC<LocationMapProps> = ({ isDark }) => { // Use the interface for props
  const styles = isDark ? { border: 0, filter: 'hue-rotate(180deg) invert(92%) contrast(100%)' } : { border: 0 };
  return (
    <div className="h-full">
      <h3 className="text-2xl font-bold mb-4">Location</h3>
      <div className="relative h-[calc(100%-3rem)] rounded-lg overflow-hidden">
        <iframe src={mapURI} width="100%" height="100%" style={styles} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg" />
      </div>
    </div>
  );
}

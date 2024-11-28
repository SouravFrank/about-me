import { mapURI } from '../config';

export default function LocationMap() {
  return (
    <div className="h-full">
      <h3 className="text-2xl font-bold mb-4">Location</h3>
      <div className="relative h-[calc(100%-3rem)] rounded-lg overflow-hidden">
        <iframe
          src={mapURI}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { mapURI } from '../config';

export default function LocationMap() {
  return (
    <motion.div
      className="shadow-neumorph rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <iframe
        src={mapURI}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      />
    </motion.div>
  );
}
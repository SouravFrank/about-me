// src/components/VisitorCounter.tsx
import React, { useState, useEffect } from 'react';
import { ref, onValue, set, get, DatabaseReference } from 'firebase/database';
import { logEvent } from 'firebase/analytics';
import { db, analytics } from '../../../firebase';
import { VisitorCounterProps, VisitorsData } from './types';
import { Users } from 'lucide-react';

// Simple hash function that converts a string into a short base36 hash.
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

function generateFingerprint(ip: string): string {
  const userAgent = navigator.userAgent;
  const screenRes = `${window.screen.width}x${window.screen.height}`;
  const rawFingerprint = `${ip}-${userAgent}-${screenRes}`;
  // Return a short unique hash
  return hashString(rawFingerprint);
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ appId }) => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const visitorsRef: DatabaseReference = ref(db, `visitors/${appId}`);

  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // Seconds
      logEvent(analytics, 'time_spent', {
        app_id: appId,
        duration: timeSpent,
      });
    };
  }, [appId]);

  useEffect(() => {
    const fetchIpAndUpdateCount = async () => {
      try {
        // Retrieve the visitor id from localStorage or generate one.
        let visitorFingerprint = localStorage.getItem('visitorFingerprint');
        if (!visitorFingerprint) {
          const response = await fetch('https://api.ipify.org?format=json');
          const data: { ip: string } = await response.json();
          visitorFingerprint = generateFingerprint(data.ip);

          localStorage.setItem('visitorFingerprint', visitorFingerprint);
        }

        // Get current visitors and update if new
        const snapshot = await get(visitorsRef);
        const visitors: VisitorsData = snapshot.val() || {};
        if (!visitors[visitorFingerprint]) {
          visitors[visitorFingerprint] = true;
          await set(visitorsRef, visitors);
        }
        setVisitorCount(Object.keys(visitors).length);
      } catch (error) {
        console.error('Error fetching IP or updating visitors:', error);
        // Fallback: generate a random fingerprint
        let visitorFingerprint = localStorage.getItem('visitorFingerprint');
        if (!visitorFingerprint) {
          visitorFingerprint = Math.random().toString(36).substring(2, 10);
          localStorage.setItem('visitorFingerprint', visitorFingerprint);
        }
        const snapshot = await get(visitorsRef);
        const visitors: VisitorsData = snapshot.val() || {};
        if (!visitors[visitorFingerprint]) {
          visitors[visitorFingerprint] = true;
          await set(visitorsRef, visitors);
        }
        setVisitorCount(Object.keys(visitors).length);
      }
    };

    fetchIpAndUpdateCount();

    const unsubscribe = onValue(visitorsRef, (snapshot) => {
      const visitors: VisitorsData = snapshot.val() || {};
      setVisitorCount(Object.keys(visitors).length);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center space-x-3 
      bg-white/10 dark:bg-gray-800/20 
      backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 
      px-6 py-3 rounded-full shadow-2xl 
      transform transition-all duration-500 hover:scale-105">
      <Users className="w-8 h-8 text-gray-900 dark:text-gray-100" />
      <p className="text-lg font-extrabold tracking-wider uppercase drop-shadow-lg text-gray-900 dark:text-gray-100">
        {visitorCount}
      </p>
    </div>
  );
};

export default VisitorCounter;
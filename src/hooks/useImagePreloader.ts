import { useState, useEffect } from 'react';
import { articles, personalInfo, projects, skills, timelineAchievements } from '../data';
import { Skill } from '../types';

const getAllImages = () => {
  const images: string[] = [];

  articles.forEach((event) => {
    images.push(...event.image);
  });

  personalInfo.profileImages.forEach((photo) => {
    images.push(photo);
  });

  projects.forEach((item) => {
    images.push(item.thumbnail);
  });

  timelineAchievements.forEach((achievement) => {
    images.push(achievement.image);
    images.push(achievement.companyImage);
  });

  Object.entries(skills).forEach(([, items]) =>
    items.forEach((skill: Skill) => {
      images.push(skill.src);
    }
    ));

  return [...new Set(images)];
};

const MIN_DURATION = 1900; // ms — minimum visible loader time

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesDone, setImagesDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Track real elapsed time via rAF so progress can advance gradually
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      setElapsed(now - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const images = getAllImages();
    setTotalImages(images.length);

    const loadImage = (url: string) =>
      new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setImagesLoaded((prev) => prev + 1);
          resolve(url);
        };
        img.onerror = () => {
          setImagesLoaded((prev) => prev + 1);
          reject(url);
        };
      });

    Promise.all(images.map((url) => loadImage(url).catch(() => null))).finally(() => {
      setImagesDone(true);
    });
  }, []);

  // Image-load fraction (0..1)
  const imageFraction = totalImages > 0 ? imagesLoaded / totalImages : imagesDone ? 1 : 0;
  // Time fraction (0..1) capped at MIN_DURATION
  const timeFraction = Math.min(1, elapsed / MIN_DURATION);

  // Progress is the slower of the two — ensures we never hit 100 before MIN_DURATION
  // and never before all images are loaded.
  const rawProgress = Math.min(imageFraction, timeFraction);
  const progress = Math.min(100, Math.round(rawProgress * 100));

  // Loader dismisses only when both conditions met
  useEffect(() => {
    if (imagesDone && elapsed >= MIN_DURATION && isLoading) {
      setIsLoading(false);
    }
  }, [imagesDone, elapsed, isLoading]);

  return { isLoading, progress };
};

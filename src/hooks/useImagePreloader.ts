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

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = getAllImages();
    setTotalImages(images.length);

    const loadImage = (url: string) => {
      return new Promise((resolve, reject) => {
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
    };

    Promise.all([...images.map((url) => loadImage(url))]).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    });
  }, []);

  const totalAssets = totalImages + 1;
  const loadedAssets = imagesLoaded;
  const progress = totalAssets === 0 ? 100 : (loadedAssets / totalAssets) * 100;

  return { isLoading, progress };
};

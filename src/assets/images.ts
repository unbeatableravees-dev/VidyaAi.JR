import hero3DImg from './media/vidya-3d-learning.png';
import explorerPng1 from './media/png1.png';
import bannerAnimation3 from './media/animation3.png';
import math3DImg from './media/vidya-math-3d.jpg';
import science3DImg from './media/vidya-science-3d.jpg';
import trophy3DImg from './media/vidya-trophy-3d.jpg';

export const APP_IMAGES = {
  hero3D: hero3DImg,
  explorerMascot: explorerPng1,
  bannerPanorama: bannerAnimation3,
  math3D: math3DImg,
  science3D: science3DImg,
  trophy3D: trophy3DImg,
};

// Fallback path helper in case of public direct load
export const getAssetUrl = (key: keyof typeof APP_IMAGES): string => {
  return APP_IMAGES[key] || `/media/${key}`;
};

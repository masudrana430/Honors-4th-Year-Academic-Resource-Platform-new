import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BraKet — ⟨φ|ψ⟩ | Physics Learning Hub',
    short_name: 'BraKet',
    description: 'Subject-wise Physics chapters, video classes, shared study notes, and a multilingual Campus Assistant.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070b20',
    theme_color: '#090d25',
    icons: [
      { src: '/icon.jpg', sizes: '256x256', type: 'image/jpeg', purpose: 'any' },
    ],
  };
}

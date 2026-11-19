export type VideoLinkInfo = { platform: string; key: string; canonicalUrl: string; thumbnailUrl: string; watchLabel: string; isYouTube: boolean };

export function parseVideoLink(value: string): VideoLinkInfo | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    if (!host || !host.includes('.')) return null;

    const youtubeHosts = ['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com'];
    if (youtubeHosts.includes(host)) {
      let id = '';
      if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || '';
      else if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
      else id = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?]+)/)?.[1] || '';
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
      return { platform: 'YouTube', key: id, canonicalUrl: \`https://www.youtube.com/watch?v=\${id}\`, thumbnailUrl: \`https://img.youtube.com/vi/\${id}/hqdefault.jpg\`, watchLabel: 'Watch on YouTube', isYouTube: true };
    }

    const platform = host === 'facebook.com' || host.endsWith('.facebook.com') || host === 'fb.watch' ? 'Facebook'
      : host === 'vimeo.com' || host.endsWith('.vimeo.com') ? 'Vimeo'
      : host === 'dailymotion.com' || host === 'dai.ly' ? 'Dailymotion'
      : host === 'drive.google.com' ? 'Google Drive'
      : host === 'tiktok.com' || host.endsWith('.tiktok.com') ? 'TikTok'
      : host === 'instagram.com' || host.endsWith('.instagram.com') ? 'Instagram'
      : host === 'x.com' || host === 'twitter.com' || host === 't.co' ? 'X'
      : host.replace(/^m\./, '').replace(/^video\./, '');
    url.hash = '';
    const canonicalUrl = url.toString();
    return { platform, key: \`external:\${host}:\${canonicalUrl}\`, canonicalUrl, thumbnailUrl: '', watchLabel: \`Watch on \${platform}\`, isYouTube: false };
  } catch { return null; }
}

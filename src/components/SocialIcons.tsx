import React from 'react';

type IconProps = { size?: number };

export const InstagramIcon: React.FC<IconProps> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.35" cy="6.65" r="1.1" fill="currentColor" />
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.5 8.5H13.6c-.7 0-1.1.5-1.1 1.2V11.5H15.4L15 14.5H12.5V22H9.3V14.5H7V11.5H9.3V9.3C9.3 6.9 10.8 5 13.2 5H15.5V8.5Z"
      fill="currentColor"
    />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2.5A9.5 9.5 0 0 0 3.8 17.2L2.5 21.5l4.4-1.3A9.5 9.5 0 1 0 12 2.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M8.6 8.3c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .5-.1.2-.2.3-.3.4-.1.1-.3.3-.4.4-.1.1-.3.3-.1.6.2.3.8 1.2 1.7 2 1.2 1 2.1 1.3 2.5 1.5.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.3.1.7-.1 1.2-.3.5-1.2 1.1-1.9 1.1-.6 0-1.7-.2-3.4-1.1-2.5-1.3-4.1-3.9-4.2-4.1-.1-.1-.9-1.2-.9-2.4 0-1.1.6-1.7.8-1.9Z"
      fill="currentColor"
    />
  </svg>
);

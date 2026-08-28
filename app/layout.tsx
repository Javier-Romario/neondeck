import '@root/global-fonts.css';
import '@root/global.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEONDECK — cyberpunk component library',
  description:
    'NEONDECK is a cyberpunk React component library. Terminal-monospace primitives rebuilt with neon glows, semi-transparent glass panels, and ticker-board edge readouts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('neondeck-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}

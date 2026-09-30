import type { Story } from '@ladle/react';

import * as React from 'react';

import Ticker from '@components/Ticker';
import TickerBoard from '@components/TickerBoard';

import { DEFAULT_TICKER_FEED } from '@common/constants';

const TONES = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'] as const;

export default {
  title: 'Ticker Board',
};

export const StandaloneTicker: Story<{
  label: string;
  tone: string;
  direction: 'left' | 'right';
  speed: number;
}> = ({ label, tone, direction, speed }) => (
  <Ticker items={DEFAULT_TICKER_FEED} label={label} tone={tone as any} direction={direction} speed={speed} />
);
StandaloneTicker.args = {
  label: 'NEONDECK',
  tone: 'teal',
  direction: 'left',
  speed: 24,
};
StandaloneTicker.argTypes = {
  tone: { control: { type: 'select', options: TONES } },
  direction: { control: { type: 'select', options: ['left', 'right'] } },
  speed: { control: { type: 'number', min: 5, max: 60, step: 1 } },
};

export const WrappedCard: Story<{
  message: string;
  messageTone: string;
  tickerTone: string;
  tickerSpeed: number;
  tickerDirection: 'left' | 'right';
  showBottomTicker: boolean;
  theme: 'dark' | 'light';
}> = ({ message, messageTone, tickerTone, tickerSpeed, tickerDirection, showBottomTicker, theme }) => (
  <TickerBoard
    message={message}
    messageTone={messageTone as any}
    tickerLabel="NEONDECK"
    tickerItems={DEFAULT_TICKER_FEED}
    tickerTone={tickerTone as any}
    tickerSpeed={tickerSpeed}
    tickerDirection={tickerDirection}
    showBottomTicker={showBottomTicker}
    theme={theme}
  >
    <Blurb title="DECKS">
      A small message box sits right above the component. Ticker strips sit inside the frame, inset past the chamfers.
    </Blurb>
  </TickerBoard>
);
WrappedCard.args = {
  message: 'SYS.UPLINK // NODE 0x1F',
  messageTone: 'magenta',
  tickerTone: 'teal',
  tickerSpeed: 28,
  tickerDirection: 'left',
  showBottomTicker: true,
  theme: 'dark',
};
WrappedCard.argTypes = {
  messageTone: { control: { type: 'select', options: TONES } },
  tickerTone: { control: { type: 'select', options: TONES } },
  tickerDirection: { control: { type: 'select', options: ['left', 'right'] } },
  tickerSpeed: { control: { type: 'number', min: 5, max: 60, step: 1 } },
  showBottomTicker: { control: { type: 'boolean' } },
  theme: { control: { type: 'select', options: ['dark', 'light'] } },
};

export const WrappedWindow: Story<{ message: string }> = ({ message }) => (
  <TickerBoard message={message} messageTone="teal" tickerLabel="LIVE" tickerItems={DEFAULT_TICKER_FEED} tickerSpeed={18}>
    <div style={{ padding: '1.5rem 3ch 2rem' }}>
      <span style={{ color: 'var(--neon-teal)', fontSize: 22, textShadow: '0 0 12px var(--neon-teal)' }}>NEONDECK</span>
      <div style={{ color: 'var(--theme-muted)', marginTop: 8 }}>
        Terminal-monospace primitives, rebuilt with neon glows and semi-transparent glass.
      </div>
    </div>
  </TickerBoard>
);
WrappedWindow.args = {
  message: 'SYS.LOG // FEED',
};

/** `theme` scopes color-scheme to the board, so it stays light even when the page is dark. */
export const LightTheme: Story = () => (
  <>
    <TickerBoard
      theme="light"
      message="SYS.UPLINK // LIGHT MODE"
      messageTone="magenta"
      tickerLabel="NEONDECK"
      tickerItems={DEFAULT_TICKER_FEED}
      tickerSpeed={28}
      showBottomTicker
    >
      <Blurb title="DECKS">
        Light mode: the glass fill, gradient borders, glow and chamfered corners all soften for a bright backdrop.
      </Blurb>
    </TickerBoard>
  </>
);

const Blurb: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ padding: '12px 3ch 20px' }}>
    <div
      style={{
        color: 'var(--theme-focused-foreground)',
        fontWeight: 700,
        letterSpacing: 1.5,
        textShadow: '0 0 10px var(--theme-focused-foreground-subdued)',
        marginBottom: 8,
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

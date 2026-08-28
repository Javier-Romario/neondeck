import type { Story } from '@ladle/react';

import Card from '@components/Card';
import Ticker from '@components/Ticker';
import TickerBoard from '@components/TickerBoard';
import Window from '@components/Window';

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
}> = ({ message, messageTone, tickerTone, tickerSpeed, tickerDirection, showBottomTicker }) => (
  <TickerBoard
    message={message}
    messageTone={messageTone as any}
    tickerLabel="NEONDECK"
    tickerItems={DEFAULT_TICKER_FEED}
    tickerTone={tickerTone as any}
    tickerSpeed={tickerSpeed}
    tickerDirection={tickerDirection}
    showBottomTicker={showBottomTicker}
  >
    <Card title="DECKS">
      A small message box sits right above the component. Ticker strips run along the top and bottom edges.
    </Card>
  </TickerBoard>
);
WrappedCard.args = {
  message: 'SYS.UPLINK // NODE 0x1F',
  messageTone: 'magenta',
  tickerTone: 'teal',
  tickerSpeed: 28,
  tickerDirection: 'left',
  showBottomTicker: true,
};
WrappedCard.argTypes = {
  messageTone: { control: { type: 'select', options: TONES } },
  tickerTone: { control: { type: 'select', options: TONES } },
  tickerDirection: { control: { type: 'select', options: ['left', 'right'] } },
  tickerSpeed: { control: { type: 'number', min: 5, max: 60, step: 1 } },
  showBottomTicker: { control: { type: 'boolean' } },
};

export const WrappedWindow: Story<{ message: string }> = ({ message }) => (
  <TickerBoard message={message} messageTone="teal" tickerLabel="LIVE" tickerItems={DEFAULT_TICKER_FEED} tickerSpeed={18}>
    <Window>
      <div style={{ padding: '2rem 2ch' }}>
        <span style={{ color: 'var(--neon-teal)', fontSize: 22, textShadow: '0 0 12px var(--neon-teal)' }}>NEONDECK</span>
        <div style={{ color: 'var(--theme-muted)', marginTop: 8 }}>
          Terminal-monospace primitives, rebuilt with neon glows and semi-transparent glass.
        </div>
      </div>
    </Window>
  </TickerBoard>
);
WrappedWindow.args = {
  message: 'SYS.LOG // FEED',
};

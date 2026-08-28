import type { Story } from '@ladle/react';

import * as React from 'react';

import NeoButton from '@components/NeoButton';
import NeoCard from '@components/NeoCard';
import NeoToggle from '@components/NeoToggle';

import { DEFAULT_TICKER_FEED } from '@common/constants';

const TONES = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'] as const;

export default {
  title: 'Neomorphic',
};

export const GlassNeoCard: Story<{ title: string; tone: string; ticker: boolean }> = ({ title, tone, ticker }) => (
  <NeoCard title={title} tone={tone as any} ticker={ticker} tickerLabel="NEONDECK" tickerItems={DEFAULT_TICKER_FEED}>
    Chamfered corners + frosted glass + a soft neumorphic shadow. Ticker runs along the top edge.
  </NeoCard>
);
GlassNeoCard.args = { title: 'NEOMORPH // GLASS', tone: 'teal', ticker: true };
GlassNeoCard.argTypes = {
  tone: { control: { type: 'select', options: TONES } },
  ticker: { control: { type: 'boolean' } },
};

export const NeoButtons: Story<{ tone: string }> = ({ tone }) => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
    <NeoButton tone={tone as any}>Raised</NeoButton>
    <NeoButton tone={tone as any} variant="pressed">
      Pressed
    </NeoButton>
    <NeoButton tone={tone as any} variant="glass">
      Glass
    </NeoButton>
  </div>
);
NeoButtons.args = { tone: 'teal' };
NeoButtons.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoToggles: Story<{ tone: string; label: string }> = ({ tone, label }) => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
    <NeoToggle label={label} tone={tone as any} defaultChecked />
    <NeoToggle label="IDLE" tone={tone as any} />
  </div>
);
NeoToggles.args = { tone: 'magenta', label: 'ARMED' };
NeoToggles.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const Console = () => (
  <NeoCard title="DASH // NEO" tone="magenta" ticker tickerLabel="LIVE" tickerItems={DEFAULT_TICKER_FEED}>
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <NeoButton tone="teal">Deploy</NeoButton>
      <NeoButton tone="magenta" variant="glass">
        Scan
      </NeoButton>
      <NeoToggle label="ARMED" tone="magenta" defaultChecked />
    </div>
  </NeoCard>
);

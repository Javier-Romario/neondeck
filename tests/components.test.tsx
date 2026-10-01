import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import * as React from 'react';

import BrailleLoader from '@components/BrailleLoader';
import Card from '@components/Card';
import NeoCard from '@components/NeoCard';
import Panel from '@components/Panel';
import Ticker from '@components/Ticker';
import TickerBoard from '@components/TickerBoard';

afterEach(cleanup);

describe('Panel', () => {
  it('exposes the four clip paths and the border width as custom properties', () => {
    const { container } = render(<Panel shape="chamfer" border={2} />);
    const panel = container.firstElementChild as HTMLElement;
    for (const v of ['--panel-outer', '--panel-inner', '--panel-ring', '--panel-halo']) {
      expect(panel.style.getPropertyValue(v)).toMatch(/^polygon\(/);
    }
    expect(panel.style.getPropertyValue('--panel-border')).toBe('2px');
    expect(panel.dataset.tone).toBe('teal');
  });

  it('accepts a custom Cuts object', () => {
    const { container } = render(<Panel shape={{ tl: 12, top: [{ at: 20, width: 10 }] }} />);
    const outer = (container.firstElementChild as HTMLElement).style.getPropertyValue('--panel-outer');
    expect(outer).toContain('12px 0px');
    expect(outer).toContain('20px 0px');
  });

  it('renders halo / ring / glass as siblings of the content, not ancestors', () => {
    const { container } = render(<Panel>hi</Panel>);
    const panel = container.firstElementChild as HTMLElement;
    const kids = [...panel.children].map((c) => c.className);
    expect(kids).toEqual(['halo', 'ring', 'glass', 'content']);
    expect(panel.querySelector('.glass')!.children).toHaveLength(0);
  });

  it('only wraps in a rig when a trail is requested', () => {
    const plain = render(<Panel />).container.firstElementChild as HTMLElement;
    expect(plain.className).toBe('panel');
    cleanup();
    const { container } = render(<Panel before after={{ noCap: true }} />);
    const rig = container.firstElementChild as HTMLElement;
    expect(rig.className).toBe('rig');
    const trails = rig.querySelectorAll('.trail');
    expect(trails).toHaveLength(2);
    expect(trails[0].getAttribute('data-side')).toBe('before');
    expect(trails[1].getAttribute('data-side')).toBe('after');
    // noCap → line only
    expect(trails[1].querySelector('.cap')).toBeNull();
    expect(trails[0].querySelector('.cap')).not.toBeNull();
  });

  it('flat disables the halo via a data attribute', () => {
    const { container } = render(<Panel flat />);
    expect((container.firstElementChild as HTMLElement).hasAttribute('data-flat')).toBe(true);
  });
});

describe('Card / NeoCard on Panel', () => {
  it('Card defaults to the slab shape and forwards the title', () => {
    const { container, getByText } = render(<Card title="DECKS">body</Card>);
    const outer = (container.firstElementChild as HTMLElement).style.getPropertyValue('--panel-outer');
    expect(outer).toContain('18px 0px'); // slab tl
    expect(getByText('DECKS').tagName).toBe('H2');
  });

  it('NeoCard only renders a ticker when there is something to show', () => {
    const none = render(<NeoCard ticker />).container;
    expect(none.querySelector('.ticker')).toBeNull();
    cleanup();
    const some = render(<NeoCard ticker tickerLabel="LIVE" />).container;
    expect(some.querySelector('.ticker')).not.toBeNull();
  });
});

describe('Ticker', () => {
  it('pins the label outside the scrolling track and duplicates the feed once', () => {
    const { container } = render(<Ticker label="LIVE" items={['A', 'B', 'C']} tone="magenta" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.dataset.tone).toBe('magenta');
    const label = root.querySelector('.label')!;
    expect(label.textContent).toBe('LIVE');
    expect(label.closest('.track')).toBeNull();
    const runs = root.querySelectorAll('.track .run');
    expect(runs).toHaveLength(2);
    expect(runs[0].querySelectorAll('.item')).toHaveLength(3);
    expect(runs[1].getAttribute('aria-hidden')).toBe('true');
  });

  it('falls back to the label as the only item when the feed is empty', () => {
    const { container } = render(<Ticker label="NEONDECK" />);
    expect(container.querySelectorAll('.run')[0].textContent).toContain('NEONDECK');
  });

  it('sets the loop duration from speed', () => {
    const { container } = render(<Ticker items={['x']} speed={7} />);
    expect((container.firstElementChild as HTMLElement).style.getPropertyValue('--ticker-speed')).toBe('7s');
  });
});

describe('TickerBoard', () => {
  it('keeps both strips inside the framed body', () => {
    const { container } = render(
      <TickerBoard message="MSG" tickerItems={['a']} showBottomTicker>
        <p>content</p>
      </TickerBoard>,
    );
    const body = container.querySelector('.body')!;
    expect(body.querySelector('.topTicker')).not.toBeNull();
    expect(body.querySelector('.bottomTicker')).not.toBeNull();
    expect(body.querySelector('.content p')!.textContent).toBe('content');
    // message sits above the frame, not inside it
    expect(container.querySelector('.message')!.closest('.body')).toBeNull();
  });

  it('renders no strips without a feed or label', () => {
    const { container } = render(<TickerBoard>x</TickerBoard>);
    expect(container.querySelector('.topTicker')).toBeNull();
  });

  it('bottom strip scrolls opposite to the top strip', () => {
    const { container } = render(<TickerBoard tickerItems={['a']} tickerDirection="left" showBottomTicker />);
    const tracks = container.querySelectorAll('.track');
    expect(tracks[0].getAttribute('data-direction')).toBe('left');
    expect(tracks[1].getAttribute('data-direction')).toBe('right');
  });
});

describe('BrailleLoader', () => {
  it('renders one cell for spin/pulse and the default count for multi-cell variants', () => {
    const count = (ui: React.ReactElement) => {
      const n = render(ui).container.querySelectorAll('.cell').length;
      cleanup();
      return n;
    };
    expect(count(<BrailleLoader variant="spin" cells={9} />)).toBe(1);
    expect(count(<BrailleLoader variant="pulse" />)).toBe(1);
    expect(count(<BrailleLoader variant="wave" />)).toBe(8);
    expect(count(<BrailleLoader variant="rain" />)).toBe(10);
    expect(count(<BrailleLoader variant="bar" cells={16} />)).toBe(16);
    expect(count(<BrailleLoader variant="bar" cells={0} />)).toBe(1);
  });

  it('numbers cells with --i so CSS can stagger them', () => {
    const { container } = render(<BrailleLoader variant="wave" cells={3} />);
    const idx = [...container.querySelectorAll<HTMLElement>('.cell')].map((c) => c.style.getPropertyValue('--i'));
    expect(idx).toEqual(['0', '1', '2']);
  });

  it('is announced as a busy status and takes the label as its name', () => {
    const { getByRole } = render(<BrailleLoader label="BREACHING" />);
    const el = getByRole('status');
    expect(el.getAttribute('aria-busy')).toBe('true');
    expect(el.getAttribute('aria-label')).toBe('BREACHING');
    expect(el.querySelector('.cells')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('maps speed, size, glitch and tone onto the root', () => {
    const { getByRole } = render(<BrailleLoader speed={2.5} size={20} glitch tone="violet" />);
    const el = getByRole('status');
    expect(el.style.getPropertyValue('--bl-speed')).toBe('2.5s');
    expect(el.style.fontSize).toBe('20px');
    expect(el.hasAttribute('data-glitch')).toBe(true);
    expect(el.dataset.tone).toBe('violet');
    expect(el.dataset.variant).toBe('spin');
  });
});

describe('Panel rig container query', () => {
  it('targets trails by data-side, not by a class that would hash into a different module scope', async () => {
    const { readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const css = readFileSync(join(__dirname, '../components/Panel.module.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const block = /@container[^{]*\{([\s\S]*?)\n\}/.exec(css);
    expect(block).not.toBeNull();
    expect(block![1]).toContain('.rig > [data-side]');
    expect(block![1]).not.toMatch(/\.trail\b/);
  });
});

describe('AsciiScene transparency contract', () => {
  it('default ramp starts with a space so alpha-0 pixels render as nothing', async () => {
    const { ASCII_RAMP, EDGE_CHARS } = await import('@components/AsciiScene');
    expect(ASCII_RAMP[0]).toBe(' ');
    expect(new Set(ASCII_RAMP).size).toBe(ASCII_RAMP.length);
    // shader bins the outline angle into exactly four glyphs appended after the ramp
    expect(EDGE_CHARS).toHaveLength(4);
    for (const ch of EDGE_CHARS) expect(ASCII_RAMP).not.toContain(ch);
  });
});

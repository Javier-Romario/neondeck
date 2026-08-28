'use client';

import * as React from 'react';

import styles from './ExampleSite.module.css';

import * as Constants from '@common/constants';

import Badge from '@components/Badge';
import Hologram from '@components/Hologram';
import GridCanvas from '@components/GridCanvas';
import MatrixRain from '@components/MatrixRain';
import NeuralField from '@components/NeuralField';
import Waveform from '@components/Waveform';
import Radar from '@components/Radar';
import GlitchText from '@components/GlitchText';

import NeoNavigation from '@components/NeoNavigation';
import NeoCard from '@components/NeoCard';
import NeoButton from '@components/NeoButton';
import NeoToggle from '@components/NeoToggle';
import NeoTicker from '@components/NeoTicker';
import NeoInput from '@components/NeoInput';
import NeoSelect from '@components/NeoSelect';
import NeoTextArea from '@components/NeoTextArea';
import NeoCheckbox from '@components/NeoCheckbox';
import NeoBarLoader from '@components/NeoBarLoader';
import NeoBarProgress from '@components/NeoBarProgress';
import NeoBlockLoader from '@components/NeoBlockLoader';
import NeoAccordion from '@components/NeoAccordion';
import NeoDialog from '@components/NeoDialog';
import NeoDrawer from '@components/NeoDrawer';
import NeoTable from '@components/NeoTable';
import NeoTableRow from '@components/NeoTableRow';
import NeoTableColumn from '@components/NeoTableColumn';
import NeoBreadcrumbs from '@components/NeoBreadcrumbs';
import NeoAvatar from '@components/NeoAvatar';
import NeoAlertBanner from '@components/NeoAlertBanner';
import NeoCodeBlock from '@components/NeoCodeBlock';
import NeoActionListItem from '@components/NeoActionListItem';

type Theme = 'light' | 'dark';

export default function ExampleSite() {
  const [mode, setMode] = React.useState<Theme>('dark');

  const apply = React.useCallback((next: Theme) => {
    setMode(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('neondeck-theme', next);
  }, []);

  React.useEffect(() => {
    const saved = window.localStorage.getItem('neondeck-theme');
    apply(saved === 'light' ? 'light' : 'dark');
  }, [apply]);

  const toggle = () => apply(mode === 'dark' ? 'light' : 'dark');

  return (
    <main className={styles.page}>
      <div className={styles.topbar}>
        <NeoNavigation
          logo="◆"
          left={<Badge>v0.1.0</Badge>}
          right={
            <>
              <NeoButton tone="yellow" variant="glass" onClick={toggle}>
                THEME: {mode.toUpperCase()}
              </NeoButton>
              <NeoButton tone="teal">SYNC</NeoButton>
            </>
          }
        >
          NEONDECK
        </NeoNavigation>
      </div>

      {/* hero */}
      <section className={styles.section}>
        <NeoCard
          title="SYS.UPLINK // NODE 0x1F"
          tone="magenta"
          ticker
          tickerLabel="NEONDECK"
          tickerItems={Constants.DEFAULT_TICKER_FEED}
          tickerSpeed={28}
        >
          <div className={styles.hero}>
            <div className={styles.heroTitle}>
              NEONDECK
              <Badge>CYBERPUNK UI</Badge>
            </div>
            <p className={styles.lead}>
              Terminal-monospace primitives, rebuilt with neon glows, semi-transparent glass, and ticker-board edge readouts.
            </p>
            <div className={styles.row}>
              <NeoButton tone="teal">Decks</NeoButton>
              <NeoButton tone="magenta" variant="glass">
                Netrun
              </NeoButton>
              <NeoButton tone="violet" variant="pressed">
                Ghost
              </NeoButton>
            </div>
          </div>
        </NeoCard>
      </section>

      {/* live canvas layer */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>01</span>
          <h2 className={styles.sectionTitle}>CANVAS // LIVE LAYER</h2>
        </div>
        <div className={styles.grid}>
          <NeoCard title="SYNTHWAVE GRID" tone="teal">
            <GridCanvas height={200} />
          </NeoCard>
          <NeoCard title="MATRIX RAIN" tone="green">
            <MatrixRain height={200} />
          </NeoCard>
          <NeoCard title="NEURAL FIELD — POKE IT" tone="violet">
            <NeuralField height={200} />
          </NeoCard>
          <NeoCard title="WAVEFORM" tone="blue">
            <Waveform height={200} />
          </NeoCard>
          <NeoCard title="RADAR" tone="magenta">
            <Radar height={200} />
          </NeoCard>
          <NeoCard title="GLITCH TEXT" tone="yellow">
            <GlitchText text="NEONDECK" height={200} />
          </NeoCard>
        </div>
      </section>

      {/* 3D island */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>02</span>
          <h2 className={styles.sectionTitle}>HOLOGRAM // R3F ISLAND</h2>
        </div>
        <NeoCard title="HOLOGRAM — R3F ISLAND" tone="magenta" ticker tickerLabel="R3F" tickerItems={Constants.DEFAULT_TICKER_FEED} tickerSpeed={22}>
          <div className={styles.stack}>
            <p className={styles.lead}>
              A three.js scene is just another island. Pick a shape, drag to orbit, hover to flip the neon. Zero extra config — the{' '}
              <code>shape</code> prop swaps the geometry.
            </p>
            <div className={styles.island}>
              <Hologram shape="diamond" height={280} />
              <Hologram shape="knot" color="#2de2ff" accent="#ff2d78" height={280} />
              <Hologram shape="torus" color="#b78bff" accent="#00ffd1" height={280} />
              <Hologram shape="icosahedron" color="#ffe66d" accent="#ff2d78" height={280} />
            </div>
          </div>
        </NeoCard>
      </section>

      {/* neomorphic controls */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>03</span>
          <h2 className={styles.sectionTitle}>CONTROLS // NEOMORPHIC</h2>
        </div>
        <div className={styles.grid}>
          <NeoCard title="INPUT" tone="teal">
            <div className={styles.stack}>
              <NeoInput label="HANDLE" placeholder="type your alias" autoComplete="off" />
              <NeoSelect name="sector" options={['Neo-Tokyo', 'Night City', 'Chiba City', 'The Sprawl']} defaultValue="Night City" />
              <NeoTextArea autoPlay="The sky above the port was the color of television, tuned to a dead channel." />
            </div>
          </NeoCard>

          <NeoCard title="BUTTONS + TOGGLES" tone="magenta">
            <div className={styles.stack}>
              <div className={styles.row}>
                <NeoButton tone="teal">Raised</NeoButton>
                <NeoButton tone="magenta" variant="pressed">
                  Pressed
                </NeoButton>
                <NeoButton tone="violet" variant="glass">
                  Glass
                </NeoButton>
              </div>
              <div className={styles.row}>
                <NeoToggle label="ARMED" tone="magenta" defaultChecked />
                <NeoToggle label="IDLE" tone="teal" />
              </div>
            </div>
          </NeoCard>

          <NeoCard title="PROGRESS" tone="green">
            <div className={styles.stack}>
              <NeoBarLoader progress={64} />
              <NeoBarLoader intervalRate={80} />
              <NeoBarProgress progress={42} />
              <div className={styles.row}>
                <NeoBlockLoader mode={2} />
                <NeoBlockLoader mode={4} />
                <NeoBlockLoader mode={9} tone="magenta" />
                <NeoBlockLoader mode={11} tone="violet" />
              </div>
            </div>
          </NeoCard>

          <NeoCard title="CHECKBOX" tone="violet">
            <div className={styles.stackSm}>
              <NeoCheckbox name="jack" defaultChecked>
                Jack into the matrix
              </NeoCheckbox>
              <NeoCheckbox name="ghost">Run silent, run deep</NeoCheckbox>
              <NeoCheckbox name="flatline">Flatline protocol</NeoCheckbox>
            </div>
          </NeoCard>

          <NeoCard title="ALERT BANNER" tone="magenta">
            <div className={styles.stack}>
              <NeoAlertBanner>ICE detected on the uplink. Connection is being traced.</NeoAlertBanner>
              <p className={styles.lead}>
                The second law demands that machines can never be perfectly efficient. We are, despite our best intentions, agents of
                entropy.
              </p>
            </div>
          </NeoCard>

          <NeoCard title="ACCORDION" tone="teal">
            <NeoAccordion defaultValue title="GHOST PROTOCOL">
              A console cowboy runs the ice with a deck and a prayer.
            </NeoAccordion>
            <NeoAccordion title="ICE-BREAKER v2.1">The ICE was black, and it was hungry.</NeoAccordion>
            <NeoAccordion title="NEURAL BRIDGE">A dream of chrome and rain.</NeoAccordion>
          </NeoCard>

          <NeoCard title="DIALOG" tone="yellow">
            <NeoDialog title="FLATLINE">There are unsaved changes. Are you sure you want to jack out?</NeoDialog>
          </NeoCard>

          <NeoCard title="DRAWER" tone="blue">
            <NeoDrawer defaultValue>
              <NeoActionListItem icon="⊹">User Commands</NeoActionListItem>
              <NeoActionListItem icon="⊹">System Calls</NeoActionListItem>
              <NeoActionListItem icon="⊹">Daemons</NeoActionListItem>
            </NeoDrawer>
          </NeoCard>
        </div>
      </section>

      {/* data + structure */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>04</span>
          <h2 className={styles.sectionTitle}>DATA // STRUCTURE</h2>
        </div>
        <div className={styles.grid}>
          <NeoCard title="BREADCRUMBS + AVATAR" tone="teal">
            <div className={styles.stack}>
              <NeoBreadcrumbs
                items={[
                  { name: 'The Sprawl', url: '#' },
                  { name: 'Chiba City', url: '#' },
                  { name: 'Case', url: '#' },
                  { name: 'Neuromancer' },
                ]}
              />
              <NeoAvatar src="https://picsum.photos/seed/ghost/64/64">
                <span>
                  MOLLY MILLIONS
                  <br />
                  <span style={{ color: 'var(--theme-muted)' }}>RAZORGIRL</span>
                </span>
              </NeoAvatar>
            </div>
          </NeoCard>

          <NeoCard title="TABLE" tone="green">
            <NeoTable>
              {Constants.SAMPLE_TABLE_DATA_CHANGE_ME.map((row, r) => (
                <NeoTableRow key={r}>
                  {row.map((cell, c) => (
                    <NeoTableColumn key={c}>{cell}</NeoTableColumn>
                  ))}
                </NeoTableRow>
              ))}
            </NeoTable>
          </NeoCard>

          <div className={styles.spanFull}>
            <NeoCard title="CODE BLOCK" tone="violet">
              <NeoCodeBlock>{`function jackIn(deck) {
  deck.ice = 'black';
  deck.flatline = false;
  return deck.run();
}`}</NeoCodeBlock>
            </NeoCard>
          </div>

          <div className={styles.spanFull}>
            <NeoCard title="EDGE TICKER" tone="magenta" ticker tickerLabel="LIVE" tickerItems={Constants.DEFAULT_TICKER_FEED} tickerSpeed={20}>
              <div className={styles.rowBetween}>
                <span className={styles.footerNote}>Standalone ticker strips can live on any edge.</span>
                <Badge>▣</Badge>
              </div>
            </NeoCard>
          </div>
        </div>
      </section>

      <NeoTicker label="SYS.LOG" tone="magenta" items={Constants.DEFAULT_TICKER_FEED} />
    </main>
  );
}

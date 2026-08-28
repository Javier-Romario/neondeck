import * as Constants from '@common/constants';

import Accordion from '@components/Accordion';
import ActionBar from '@components/ActionBar';
import ActionButton from '@components/ActionButton';
import ActionListItem from '@components/ActionListItem';
import AlertBanner from '@components/AlertBanner';
import Avatar from '@components/Avatar';
import Badge from '@components/Badge';
import BarLoader from '@components/BarLoader';
import BarProgress from '@components/BarProgress';
import BlockLoader from '@components/BlockLoader';
import Breadcrumbs from '@components/Breadcrumbs';
import Button from '@components/Button';
import ButtonGroup from '@components/ButtonGroup';
import Card from '@components/Card';
import CardDouble from '@components/CardDouble';
import Checkbox from '@components/Checkbox';
import CRTOverlay from '@components/CRTOverlay';
import CodeBlock from '@components/CodeBlock';
import Dialog from '@components/Dialog';
import Divider from '@components/Divider';
import Drawer from '@components/Drawer';
import Grid from '@components/Grid';
import GlitchText from '@components/GlitchText';
import GridCanvas from '@components/GridCanvas';
import HexGrid from '@components/HexGrid';
import Hologram from '@components/Hologram';
import Input from '@components/Input';
import MatrixRain from '@components/MatrixRain';
import Navigation from '@components/Navigation';
import NeonTunnel from '@components/NeonTunnel';
import NeuralField from '@components/NeuralField';
import Radar from '@components/Radar';
import Row from '@components/Row';
import RowSpaceBetween from '@components/RowSpaceBetween';
import Select from '@components/Select';
import Spectrum from '@components/Spectrum';
import Starfield from '@components/Starfield';
import Table from '@components/Table';
import TableColumn from '@components/TableColumn';
import TableRow from '@components/TableRow';
import Text from '@components/Text';
import TextArea from '@components/TextArea';
import Ticker from '@components/Ticker';
import TickerBoard from '@components/TickerBoard';
import Waveform from '@components/Waveform';
import Window from '@components/Window';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <main style={{ padding: '1.5rem 1rem 6rem', maxWidth: 960, margin: '0 auto' }}>
      <Navigation
        logo="◆"
        left={<Badge>v0.1.0</Badge>}
        right={
          <>
            <ActionButton hotkey="⌘+T">THEME</ActionButton>
            <ActionButton hotkey="⌘+S">SYNC</ActionButton>
          </>
        }
      >
        NEONDECK
      </Navigation>

      <br />

      {/* hero: the signature ticker-board treatment */}
      <TickerBoard
        message="SYS.UPLINK // NODE 0x1F"
        messageTone="magenta"
        tickerLabel="NEONDECK"
        tickerItems={Constants.DEFAULT_TICKER_FEED}
        tickerSpeed={28}
        showBottomTicker
      >
        <Window>
          <div style={{ padding: '2rem 2ch' }}>
            <Row>
              <span style={{ color: 'var(--neon-teal)', fontSize: 26, textShadow: '0 0 12px var(--neon-teal)' }}>NEONDECK</span>{' '}
              <Badge>CYBERPUNK UI</Badge>
            </Row>
            <Row style={{ color: 'var(--theme-muted)' }}>
              Terminal-monospace primitives, rebuilt with neon glows, semi-transparent glass, and ticker-board edge readouts.
            </Row>
            <Row>
              <ActionBar
                items={[
                  { hotkey: '⌘+1', body: 'DECKS', selected: true },
                  { hotkey: '⌘+2', body: 'NETRUN' },
                  { hotkey: '⌘+3', body: 'GHOST' },
                ]}
              />
            </Row>
          </div>
        </Window>
      </TickerBoard>

      <br />
      <br />

      <TickerBoard message="3D // HOLOGRAM" messageTone="magenta" tickerLabel="R3F" tickerItems={Constants.DEFAULT_TICKER_FEED} tickerSpeed={22}>
        <Card title="HOLOGRAM — R3F ISLAND">
          <Text>
            A three.js scene is just another island. Pick a shape, drag to orbit, hover to flip the neon. Zero extra config — the{' '}
            <code>shape</code> prop swaps the geometry.
          </Text>
          <br />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            <Hologram shape="diamond" height={280} />
            <Hologram shape="knot" color="#2de2ff" accent="#ff2d78" height={280} />
            <Hologram shape="torus" color="#b78bff" accent="#00ffd1" height={280} />
            <Hologram shape="icosahedron" color="#ffe66d" accent="#ff2d78" height={280} />
          </div>
        </Card>
      </TickerBoard>

      <br />
      <br />

      <Grid>
        <Card title="SYNTHWAVE GRID">
          <GridCanvas height={200} />
        </Card>

        <Card title="MATRIX RAIN">
          <MatrixRain height={200} />
        </Card>

        <Card title="NEURAL FIELD — POKE IT">
          <NeuralField height={200} />
        </Card>

        <Card title="WAVEFORM">
          <Waveform height={200} />
        </Card>

        <Card title="RADAR">
          <Radar height={200} />
        </Card>

        <Card title="GLITCH TEXT">
          <GlitchText text="NEONDECK" height={200} />
        </Card>

        <Card title="HEX GRID">
          <HexGrid height={200} />
        </Card>

        <Card title="STARFIELD WARP">
          <Starfield height={200} speed={1.4} />
        </Card>

        <Card title="SPECTRUM">
          <Spectrum height={200} />
        </Card>

        <Card title="CRT OVERLAY">
          <CRTOverlay height={200}>
            <div style={{ padding: '1.2rem 1ch', fontFamily: 'var(--font-family-mono)' }}>
              <Row style={{ fontSize: 22, color: 'var(--theme-focused-foreground)' }}>SYSTEM READY</Row>
              <Row style={{ color: 'var(--theme-muted)' }}>scanlines · noise · vignette · rolling band</Row>
            </div>
          </CRTOverlay>
        </Card>

        <Card title="NEON TUNNEL — 3D">
          <NeonTunnel height={300} />
        </Card>

        <TickerBoard message="TICKER" tickerItems={['UPLINK', 'SYNC', 'LOCK']} tickerSpeed={16}>
          <Card title="TICKER BOARD">
            A small message box sits right above the component, while a scrolling ticker strip runs along the top edge. Toggle the
            bottom edge for a full HUD frame.
          </Card>
        </TickerBoard>

        <TickerBoard message="BUTTONS" messageTone="violet" showTopTicker={false}>
          <Card title="BUTTONS">
            <Button>Primary Button</Button>
            <br />
            <br />
            <Button theme="SECONDARY">Secondary Button</Button>
            <br />
            <br />
            <Button isDisabled>Disabled Button</Button>
          </Card>
        </TickerBoard>

        <Card title="INPUT">
          <Input label="HANDLE" placeholder="type your alias" autoComplete="off" />
          <br />
          <br />
          <Select name="sector" options={['Neo-Tokyo', 'Night City', 'Chiba City', 'The Sprawl']} defaultValue="Night City" />
          <br />
          <br />
          <TextArea autoPlay="The sky above the port was the color of television, tuned to a dead channel." />
        </Card>

        <Card title="PROGRESS">
          <BarLoader progress={64} />
          <br />
          <BarLoader intervalRate={80} />
          <br />
          <BarProgress progress={42} />
          <br />
          <BlockLoader mode={2} /> <BlockLoader mode={4} /> <BlockLoader mode={9} /> <BlockLoader mode={11} />
        </Card>

        <Card title="BUTTON GROUP">
          <ButtonGroup items={[{ body: '16 PX', selected: true }, { body: '32 PX' }, { body: '42 PX' }]} />
          <br />
          <br />
          <ButtonGroup isFull items={[{ body: 'ICE', selected: true }, { body: 'SENTRY' }, { body: 'DAEMON' }]} />
        </Card>

        <Card title="CHECKBOX">
          <Checkbox name="jack" defaultChecked>
            Jack into the matrix
          </Checkbox>
          <Checkbox name="ghost">Run silent, run deep</Checkbox>
          <Checkbox name="flatline">Flatline protocol</Checkbox>
        </Card>

        <CardDouble title="ALERT + DIVIDER">
          <AlertBanner>ICE detected on the uplink. Connection is being traced.</AlertBanner>
          <br />
          <Divider type="GRADIENT" />
          <br />
          <Text>The second law demands that machines can never be perfectly efficient. We are, despite our best intentions, agents of
            entropy.</Text>
          <br />
          <Divider type="DOUBLE" />
        </CardDouble>

        <Card title="ACCORDION">
          <Accordion defaultValue title="GHOST PROTOCOL">
            A console cowboy runs the ice with a deck and a prayer.
          </Accordion>
          <Accordion title="ICE-BREAKER v2.1">
            The ICE was black, and it was hungry.
          </Accordion>
          <Accordion title="NEURAL BRIDGE">
            A dream of chrome and rain.
          </Accordion>
        </Card>

        <Card title="DIALOG">
          <Dialog title="FLATLINE">There are unsaved changes. Are you sure you want to jack out?</Dialog>
        </Card>

        <Card title="DRAWER">
          <Drawer defaultValue>
            <ActionListItem icon="⊹">User Commands</ActionListItem>
            <ActionListItem icon="⊹">System Calls</ActionListItem>
            <ActionListItem icon="⊹">Daemons</ActionListItem>
          </Drawer>
        </Card>

        <Card title="BREADCRUMBS">
          <Breadcrumbs
            items={[
              { name: 'The Sprawl', url: '#' },
              { name: 'Chiba City', url: '#' },
              { name: 'Case', url: '#' },
              { name: 'Neuromancer' },
            ]}
          />
          <br />
          <br />
          <Avatar src="https://picsum.photos/seed/ghost/64/64">
            <span>
              MOLLY MILLIONS
              <br />
              <span style={{ color: 'var(--theme-muted)' }}>RAZORGIRL</span>
            </span>
          </Avatar>
        </Card>

        <Card title="TABLE">
          <Table>
            {Constants.SAMPLE_TABLE_DATA_CHANGE_ME.map((row, r) => (
              <TableRow key={r}>
                {row.map((cell, c) => (
                  <TableColumn key={c}>{cell}</TableColumn>
                ))}
              </TableRow>
            ))}
          </Table>
        </Card>

        <Card title="CODE BLOCK">
          <CodeBlock>{`function jackIn(deck) {
  deck.ice = 'black';
  deck.flatline = false;
  return deck.run();
}`}</CodeBlock>
        </Card>
      </Grid>

      <br />
      <br />

      <TickerBoard message="SYS.LOG // FEED" tickerLabel="LIVE" tickerItems={Constants.DEFAULT_TICKER_FEED} tickerSpeed={20}>
        <Card title="EDGE TICKER">
          <RowSpaceBetween>
            <span>Standalone ticker strips can live on any edge.</span>
            <Badge>▣</Badge>
          </RowSpaceBetween>
        </Card>
      </TickerBoard>
    </main>
  );
}

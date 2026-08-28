import type { Story } from '@ladle/react';

import NeoAccordion from '@components/NeoAccordion';
import NeoActionListItem from '@components/NeoActionListItem';
import NeoAlertBanner from '@components/NeoAlertBanner';
import NeoAvatar from '@components/NeoAvatar';
import NeoBreadcrumbs from '@components/NeoBreadcrumbs';
import NeoCodeBlock from '@components/NeoCodeBlock';
import NeoDialog from '@components/NeoDialog';
import NeoDrawer from '@components/NeoDrawer';
import NeoNavigation from '@components/NeoNavigation';
import NeoTable from '@components/NeoTable';
import NeoTableColumn from '@components/NeoTableColumn';
import NeoTableRow from '@components/NeoTableRow';

import { SAMPLE_TABLE_DATA_CHANGE_ME } from '@common/constants';
import { NeoThemeToggle } from './NeoTheme';

const TONES = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'] as const;

export default {
  title: 'Neomorphic / Data',
};

export const NeoNavigationBar: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoNavigation
      logo="◆"
      tone={tone as any}
      left={<span style={{ color: 'var(--theme-muted)' }}>NEONDECK</span>}
      right={<NeoActionListItem icon="⊹" tone={tone as any}>Sync</NeoActionListItem>}
    >
      CYBERPUNK UI
    </NeoNavigation>
  </>
);
NeoNavigationBar.args = { tone: 'teal' };
NeoNavigationBar.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoBreadcrumbTrail: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoBreadcrumbs
      tone={tone as any}
      items={[
        { name: 'The Sprawl', url: '#' },
        { name: 'Chiba City', url: '#' },
        { name: 'Case', url: '#' },
        { name: 'Neuromancer' },
      ]}
    />
  </>
);
NeoBreadcrumbTrail.args = { tone: 'teal' };
NeoBreadcrumbTrail.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoAvatarRow: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoAvatar src="https://picsum.photos/seed/ghost/64/64" tone={tone as any}>
      <span>
        MOLLY MILLIONS
        <br />
        <span style={{ color: 'var(--theme-muted)' }}>RAZORGIRL</span>
      </span>
    </NeoAvatar>
  </>
);
NeoAvatarRow.args = { tone: 'teal' };
NeoAvatarRow.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoAlert: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoAlertBanner tone={tone as any}>ICE detected on the uplink. Connection is being traced.</NeoAlertBanner>
  </>
);
NeoAlert.args = { tone: 'magenta' };
NeoAlert.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoCode: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoCodeBlock tone={tone as any}>{`function jackIn(deck) {
  deck.ice = 'black';
  deck.flatline = false;
  return deck.run();
}`}</NeoCodeBlock>
  </>
);
NeoCode.args = { tone: 'teal' };
NeoCode.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoDataTable: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoTable tone={tone as any}>
      {SAMPLE_TABLE_DATA_CHANGE_ME.map((row, r) => (
        <NeoTableRow key={r}>
          {row.map((cell, c) => (
            <NeoTableColumn key={c}>{cell}</NeoTableColumn>
          ))}
        </NeoTableRow>
      ))}
    </NeoTable>
  </>
);
NeoDataTable.args = { tone: 'teal' };
NeoDataTable.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoDialogExample: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoDialog title="FLATLINE" tone={tone as any}>
      There are unsaved changes. Jack out?
    </NeoDialog>
  </>
);
NeoDialogExample.args = { tone: 'teal' };
NeoDialogExample.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoDrawerExample: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoDrawer defaultValue tone={tone as any}>
      <NeoActionListItem icon="⊹" tone={tone as any}>
        User Commands
      </NeoActionListItem>
      <NeoActionListItem icon="⊹" tone={tone as any}>
        System Calls
      </NeoActionListItem>
      <NeoActionListItem icon="⊹" tone={tone as any}>
        Daemons
      </NeoActionListItem>
    </NeoDrawer>
  </>
);
NeoDrawerExample.args = { tone: 'teal' };
NeoDrawerExample.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoAccordionExample: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoAccordion defaultValue title="GHOST PROTOCOL" tone={tone as any}>
      A console cowboy runs the ice with a deck and a prayer.
    </NeoAccordion>
    <NeoAccordion title="ICE-BREAKER v2.1" tone={tone as any}>
      The ICE was black, and it was hungry.
    </NeoAccordion>
  </>
);
NeoAccordionExample.args = { tone: 'teal' };
NeoAccordionExample.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoDataPlayground = () => (
  <>
    <NeoThemeToggle />
    <div style={{ display: 'grid', gap: 20, maxWidth: 640 }}>
      <NeoNavigation
        logo="◆"
        tone="teal"
        left={<span style={{ color: 'var(--theme-muted)' }}>NEONDECK</span>}
        right={<NeoActionListItem icon="⊹" tone="teal">Sync</NeoActionListItem>}
      >
        CYBERPUNK UI
      </NeoNavigation>
      <NeoBreadcrumbs
        tone="magenta"
        items={[
          { name: 'The Sprawl', url: '#' },
          { name: 'Chiba City', url: '#' },
          { name: 'Neuromancer' },
        ]}
      />
      <NeoAlertBanner tone="magenta">ICE detected on the uplink. Connection is being traced.</NeoAlertBanner>
      <NeoTable tone="teal">
        {SAMPLE_TABLE_DATA_CHANGE_ME.map((row, r) => (
          <NeoTableRow key={r}>
            {row.map((cell, c) => (
              <NeoTableColumn key={c}>{cell}</NeoTableColumn>
            ))}
          </NeoTableRow>
        ))}
      </NeoTable>
      <NeoCodeBlock tone="violet">{`function jackIn(deck) {
  deck.ice = 'black';
  return deck.run();
}`}</NeoCodeBlock>
      <NeoAccordion defaultValue title="GHOST PROTOCOL" tone="green">
        A console cowboy runs the ice with a deck and a prayer.
      </NeoAccordion>
      <NeoDialog title="FLATLINE" tone="red">
        There are unsaved changes. Jack out?
      </NeoDialog>
    </div>
  </>
);

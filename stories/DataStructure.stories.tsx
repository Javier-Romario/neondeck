import type { Story } from '@ladle/react';

import Accordion from '@components/Accordion';
import ActionListItem from '@components/ActionListItem';
import AlertBanner from '@components/AlertBanner';
import Avatar from '@components/Avatar';
import Breadcrumbs from '@components/Breadcrumbs';
import CodeBlock from '@components/CodeBlock';
import Dialog from '@components/Dialog';
import Drawer from '@components/Drawer';
import Navigation from '@components/Navigation';
import Table from '@components/Table';
import TableColumn from '@components/TableColumn';
import TableRow from '@components/TableRow';

import { SAMPLE_TABLE_DATA_CHANGE_ME } from '@common/constants';

export default {
  title: 'Data & Structure',
};

export const NavigationBar = () => (
  <Navigation logo="◆" left={<span style={{ color: 'var(--neon-teal)' }}>NEONDECK</span>} right={<ActionListItem icon="⊹">Sync</ActionListItem>}>
    CYBERPUNK UI
  </Navigation>
);

export const BreadcrumbTrail = () => (
  <Breadcrumbs
    items={[
      { name: 'The Sprawl', url: '#' },
      { name: 'Chiba City', url: '#' },
      { name: 'Case', url: '#' },
      { name: 'Neuromancer' },
    ]}
  />
);

export const AvatarRow = () => (
  <Avatar src="https://picsum.photos/seed/ghost/64/64">
    <span>
      MOLLY MILLIONS
      <br />
      <span style={{ color: 'var(--theme-muted)' }}>RAZORGIRL</span>
    </span>
  </Avatar>
);

export const Alert = () => <AlertBanner>ICE detected on the uplink. Connection is being traced.</AlertBanner>;

export const Code = () => (
  <CodeBlock>{`function jackIn(deck) {
  deck.ice = 'black';
  deck.flatline = false;
  return deck.run();
}`}</CodeBlock>
);

export const DataTable = () => (
  <Table>
    {SAMPLE_TABLE_DATA_CHANGE_ME.map((row, r) => (
      <TableRow key={r}>
        {row.map((cell, c) => (
          <TableColumn key={c}>{cell}</TableColumn>
        ))}
      </TableRow>
    ))}
  </Table>
);

export const DialogExample = () => <Dialog title="FLATLINE">There are unsaved changes. Jack out?</Dialog>;

export const DrawerExample = () => (
  <Drawer defaultValue>
    <ActionListItem icon="⊹">User Commands</ActionListItem>
    <ActionListItem icon="⊹">System Calls</ActionListItem>
    <ActionListItem icon="⊹">Daemons</ActionListItem>
  </Drawer>
);

export const AccordionExample = () => (
  <>
    <Accordion defaultValue title="GHOST PROTOCOL">
      A console cowboy runs the ice with a deck and a prayer.
    </Accordion>
    <Accordion title="ICE-BREAKER v2.1">The ICE was black, and it was hungry.</Accordion>
  </>
);

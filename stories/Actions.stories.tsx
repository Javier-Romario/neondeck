import type { Story } from '@ladle/react';

import ActionBar from '@components/ActionBar';
import ActionButton from '@components/ActionButton';
import Badge from '@components/Badge';
import Button from '@components/Button';
import ButtonGroup from '@components/ButtonGroup';

export default {
  title: 'Actions',
};

export const Buttons: Story<{ theme: string; disabled: boolean; label: string }> = ({ theme, disabled, label }) => (
  <Button theme={theme as any} isDisabled={disabled}>
    {label}
  </Button>
);
Buttons.args = { theme: 'PRIMARY', disabled: false, label: 'Primary Button' };
Buttons.argTypes = {
  theme: { control: { type: 'select', options: ['PRIMARY', 'SECONDARY'] } },
  disabled: { control: { type: 'boolean' } },
};

export const ActionButtons = () => (
  <>
    <ActionButton hotkey="⌘+S">Save</ActionButton>
    <br />
    <br />
    <ActionButton hotkey="ESC">Exit</ActionButton>
  </>
);

export const ActionBarExample = () => (
  <ActionBar
    items={[
      { hotkey: '⌘+1', body: 'DECKS', selected: true },
      { hotkey: '⌘+2', body: 'NETRUN' },
      { hotkey: '⌘+3', body: 'GHOST' },
    ]}
  />
);

export const Group: Story<{ full: boolean }> = ({ full }) => (
  <ButtonGroup isFull={full} items={[{ body: 'ICE', selected: true }, { body: 'SENTRY' }, { body: 'DAEMON' }]} />
);
Group.args = { full: false };
Group.argTypes = { full: { control: { type: 'boolean' } } };

export const Badges = () => (
  <>
    <Badge>v0.1.0</Badge> <Badge>ONLINE</Badge>
  </>
);

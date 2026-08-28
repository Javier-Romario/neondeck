import type { Story } from '@ladle/react';

import NeoBarLoader from '@components/NeoBarLoader';
import NeoBarProgress from '@components/NeoBarProgress';
import NeoBlockLoader from '@components/NeoBlockLoader';
import NeoCheckbox from '@components/NeoCheckbox';
import NeoInput from '@components/NeoInput';
import NeoSelect from '@components/NeoSelect';
import NeoTextArea from '@components/NeoTextArea';

import { NeoThemeToggle } from './NeoTheme';

const TONES = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'] as const;

export default {
  title: 'Neomorphic / Forms',
};

export const NeoInputField: Story<{ label: string; placeholder: string; tone: string }> = ({ label, placeholder, tone }) => (
  <>
    <NeoThemeToggle />
    <NeoInput label={label} placeholder={placeholder} autoComplete="off" tone={tone as any} />
  </>
);
NeoInputField.args = { label: 'HANDLE', placeholder: 'type your alias', tone: 'teal' };
NeoInputField.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoTextAreaField: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoTextArea
      tone={tone as any}
      autoPlay="The sky above the port was the color of television, tuned to a dead channel."
    />
  </>
);
NeoTextAreaField.args = { tone: 'teal' };
NeoTextAreaField.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoSelectField: Story<{ value: string; tone: string }> = ({ value, tone }) => (
  <>
    <NeoThemeToggle />
    <NeoSelect
      name="sector"
      options={['Neo-Tokyo', 'Night City', 'Chiba City', 'The Sprawl']}
      defaultValue={value}
      tone={tone as any}
    />
  </>
);
NeoSelectField.args = { value: 'Night City', tone: 'teal' };
NeoSelectField.argTypes = {
  value: { control: { type: 'select', options: ['Neo-Tokyo', 'Night City', 'Chiba City', 'The Sprawl'] } },
  tone: { control: { type: 'select', options: TONES } },
};

export const NeoCheckboxes: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoCheckbox name="jack" defaultChecked tone={tone as any}>
      Jack into the matrix
    </NeoCheckbox>
    <NeoCheckbox name="ghost" tone={tone as any}>
      Run silent, run deep
    </NeoCheckbox>
    <NeoCheckbox name="flatline" tone={tone as any}>
      Flatline protocol
    </NeoCheckbox>
  </>
);
NeoCheckboxes.args = { tone: 'teal' };
NeoCheckboxes.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoLoaders: Story<{ tone: string }> = ({ tone }) => (
  <>
    <NeoThemeToggle />
    <NeoBarLoader progress={64} tone={tone as any} />
    <br />
    <NeoBarLoader intervalRate={80} tone={tone as any} />
    <br />
    <NeoBarProgress progress={42} tone={tone as any} />
    <br />
    <div style={{ display: 'flex', gap: 12 }}>
      <NeoBlockLoader mode={2} tone={tone as any} />
      <NeoBlockLoader mode={4} tone={tone as any} />
      <NeoBlockLoader mode={9} tone={tone as any} />
      <NeoBlockLoader mode={11} tone={tone as any} />
    </div>
  </>
);
NeoLoaders.args = { tone: 'teal' };
NeoLoaders.argTypes = { tone: { control: { type: 'select', options: TONES } } };

export const NeoFormPlayground = () => (
  <>
    <NeoThemeToggle />
    <div style={{ display: 'grid', gap: 20, maxWidth: 560 }}>
      <NeoInput label="HANDLE" placeholder="type your alias" autoComplete="off" tone="teal" />
      <NeoSelect
        name="sector"
        options={['Neo-Tokyo', 'Night City', 'Chiba City', 'The Sprawl']}
        defaultValue="Night City"
        tone="magenta"
      />
      <NeoTextArea
        tone="violet"
        autoPlay="A console cowboy runs the ice with a deck and a prayer."
      />
      <div>
        <NeoCheckbox name="jack" defaultChecked tone="green">
          Jack into the matrix
        </NeoCheckbox>
        <NeoCheckbox name="ghost" tone="green">
          Run silent, run deep
        </NeoCheckbox>
      </div>
      <NeoBarLoader progress={64} tone="teal" />
      <NeoBarProgress progress={42} tone="orange" />
      <div style={{ display: 'flex', gap: 12 }}>
        <NeoBlockLoader mode={2} tone="blue" />
        <NeoBlockLoader mode={4} tone="red" />
        <NeoBlockLoader mode={9} tone="yellow" />
        <NeoBlockLoader mode={11} tone="magenta" />
      </div>
    </div>
  </>
);

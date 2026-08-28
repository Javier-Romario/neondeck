import type { Story } from '@ladle/react';

import BarLoader from '@components/BarLoader';
import BarProgress from '@components/BarProgress';
import BlockLoader from '@components/BlockLoader';
import Checkbox from '@components/Checkbox';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';

export default {
  title: 'Forms',
};

export const InputField: Story<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
  <Input label={label} placeholder={placeholder} autoComplete="off" />
);
InputField.args = { label: 'HANDLE', placeholder: 'type your alias' };

export const TextAreaField = () => (
  <TextArea autoPlay="The sky above the port was the color of television, tuned to a dead channel." />
);

export const SelectField: Story<{ value: string }> = ({ value }) => (
  <Select
    name="sector"
    options={['Neo-Tokyo', 'Night City', 'Chiba City', 'The Sprawl']}
    defaultValue={value}
  />
);
SelectField.args = { value: 'Night City' };
SelectField.argTypes = {
  value: { control: { type: 'select', options: ['Neo-Tokyo', 'Night City', 'Chiba City', 'The Sprawl'] } },
};

export const Checkboxes = () => (
  <>
    <Checkbox name="jack" defaultChecked>
      Jack into the matrix
    </Checkbox>
    <Checkbox name="ghost">Run silent, run deep</Checkbox>
    <Checkbox name="flatline">Flatline protocol</Checkbox>
  </>
);

export const Loaders = () => (
  <>
    <BarLoader progress={64} />
    <br />
    <BarLoader intervalRate={80} />
    <br />
    <BarProgress progress={42} />
    <br />
    <BlockLoader mode={2} /> <BlockLoader mode={4} /> <BlockLoader mode={9} /> <BlockLoader mode={11} />
  </>
);

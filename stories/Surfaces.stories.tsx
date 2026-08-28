import type { Story } from '@ladle/react';

import Card from '@components/Card';
import CardDouble from '@components/CardDouble';
import Window from '@components/Window';
import Divider from '@components/Divider';
import Text from '@components/Text';

export default {
  title: 'Surfaces',
};

export const BasicCard: Story<{ title: string; mode: string }> = ({ title, mode }) => (
  <Card title={title} mode={mode}>
    Neon corner brackets, semi-transparent glass, and a title bar.
  </Card>
);
BasicCard.args = { title: 'CARD', mode: 'default' };
BasicCard.argTypes = {
  mode: { control: { type: 'select', options: ['default', 'left', 'right'] } },
};

export const NestedCards = () => (
  <Card title="LEFT-A" mode="left">
    <Card title="RIGHT-B" mode="right">
      <Card title="C">To seek the timeless way we must first know the quality without a name.</Card>
    </Card>
  </Card>
);

export const DoubleStroke = () => (
  <CardDouble title="POST">
    <Divider type="GRADIENT" />
    <br />
    <Text>The structure of life I have described in buildings is deeply connected with the human person.</Text>
    <br />
    <Divider type="DOUBLE" />
  </CardDouble>
);

export const WindowFrame = () => (
  <Window>
    <div style={{ padding: '2rem 2ch' }}>
      <Text>Semi-transparent terminal frame with a scanline overlay and a neon drop shadow.</Text>
    </div>
  </Window>
);

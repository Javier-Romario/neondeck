import * as React from 'react';
import Card from '@components/Card';
import type { CardProps } from '@components/Card';

/** @deprecated Identical to `Card`; kept for backward compatibility. */
const CardDouble: React.FC<CardProps> = (props) => <Card {...props} />;

export default CardDouble;

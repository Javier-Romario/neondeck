'use client';

import styles from '@components/TextArea.module.css';

import * as React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  autoPlay?: string;
  autoPlaySpeedMS?: number;
  isBlink?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({ autoPlay, autoPlaySpeedMS = 40, isBlink = true, ...rest }) => {
  const [value, setValue] = React.useState<string>(() => (typeof rest.defaultValue === 'string' ? rest.defaultValue : ''));

  React.useEffect(() => {
    if (!autoPlay) return;
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setValue(autoPlay.slice(0, index));
      if (index >= autoPlay.length) clearInterval(timer);
    }, autoPlaySpeedMS);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlaySpeedMS]);

  return (
    <div className={styles.wrap}>
      <textarea className={styles.textarea} value={value} onChange={(e) => setValue(e.target.value)} {...rest} />
      <span className={styles.caret} aria-hidden="true" data-blink={isBlink ? 'true' : 'false'}>
        ▮
      </span>
    </div>
  );
};

export default TextArea;

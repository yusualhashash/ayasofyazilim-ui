import React from 'react';
import { Button } from '@/components/ui/button';

export type ExampleProps = {
  text?: String;
};
export function Example(props: ExampleProps) {
  const [count, setCount] = React.useState(0);
  return (
    <Button
      onClick={() => setCount(count + 1)}
      type="button"
      id="example-button"
    >
      {`${props.text} ${count}`}
    </Button>
  );
}

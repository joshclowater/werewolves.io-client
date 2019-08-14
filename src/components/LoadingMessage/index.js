import React from 'react';
import Loading from 'components/Loading';

export default function({ message, ...rest }) {
  return (
    <div {...rest}>
      <Loading />
      {message}
    </div>
  );
}

import React from 'react';
import { useTransition } from 'react-spring';

import { IToastMessage } from '../../hooks/ToastContext';
import { Container } from './styles';

import Toast from './Toast';

interface IToastProps {
  messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastProps> = ({ messages }) => {
  const messagesWithTRansitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );
  return (
    <Container>
      {messagesWithTRansitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;

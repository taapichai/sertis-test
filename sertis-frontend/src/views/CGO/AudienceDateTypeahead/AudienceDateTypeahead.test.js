import React from 'react';
import ReactDOM from 'react-dom';
import AudienceDateTypeahead from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AudienceDateTypeahead />, div);
  ReactDOM.unmountComponentAtNode(div);
});

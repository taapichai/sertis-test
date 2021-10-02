import React from 'react';
import ReactDOM from 'react-dom';
import FacebookBusinessManagerTypeahead from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FacebookBusinessManagerTypeahead />, div);
  ReactDOM.unmountComponentAtNode(div);
});

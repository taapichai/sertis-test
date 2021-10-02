import React from 'react';
import ReactDOM from 'react-dom';
import T1SVOCTypeahead from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<T1SVOCTypeahead />, div);
  ReactDOM.unmountComponentAtNode(div);
});

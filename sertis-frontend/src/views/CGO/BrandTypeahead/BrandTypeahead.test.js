import React from 'react';
import ReactDOM from 'react-dom';
import BusinessUnitTypeahead from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusinessUnitTypeahead />, div);
  ReactDOM.unmountComponentAtNode(div);
});

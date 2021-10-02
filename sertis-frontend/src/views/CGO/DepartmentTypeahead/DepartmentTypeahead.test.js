import React from 'react';
import ReactDOM from 'react-dom';
import DepartmentTypeahead from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DepartmentTypeahead />, div);
  ReactDOM.unmountComponentAtNode(div);
});

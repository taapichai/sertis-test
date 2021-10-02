import React from 'react';
import ReactDOM from 'react-dom';
import BlogCards from './BlogCards';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BlogCards />, div);
  ReactDOM.unmountComponentAtNode(div);
});

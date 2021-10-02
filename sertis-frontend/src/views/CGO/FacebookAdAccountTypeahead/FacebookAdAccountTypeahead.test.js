import React from 'react';
import ReactDOM from 'react-dom';
import FacebookAdAccountTypeahead from './FacebookAdAccountTypeahead';

let adAccounts = [{ "id": "1", "label": "Test Ad Account"}]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FacebookAdAccountTypeahead adAccounts={adAccounts}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

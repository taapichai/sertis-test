import React from 'react';
import ReactDOM from 'react-dom';
import CustomAudienceResultTable from './';

const data = []

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomAudienceResultTable module_name='CALTEX' data={data}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

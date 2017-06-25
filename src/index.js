import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedApp from './ConnectedApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));
registerServiceWorker();

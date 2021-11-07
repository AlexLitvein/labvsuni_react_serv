// Browser Code

const React = require('react')
const ReactDOM = require('react-dom')


import { Provider } from 'react-redux';
import MyStore from './store/DataController';
import './index.css';
import App from './App';

// const Header = require('../components/header.jsx')
// const Footer = require('../components/footer.jsx')
// const MessageBoard = require('../components/board.jsx')
// const { default: SvgChart } = require('../components/SvgChart.js')



// ReactDOM.hydrate(<Header />, document.getElementById('header'))
// ReactDOM.hydrate(<Footer />, document.getElementById('footer'))
// ReactDOM.hydrate(<MessageBoard messages={messages}/>, document.getElementById('message-board'))

// ReactDOM.hydrate( <SvgChart options={options} axis={axis} />, document.getElementById('root'))

ReactDOM.hydrate(
    <React.StrictMode>
      <Provider store={MyStore}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
// Browser Code

const React = require('react')
const ReactDOM = require('react-dom')

const Header = require('../components/header.jsx')
const Footer = require('../components/footer.jsx')
const MessageBoard = require('../components/board.jsx')
const { default: SvgChart } = require('../components/SvgChart.js')

const axis = {
    _id: { name: 'Дата', min: 0, max: 0, type: 'H', cls: 'axis', clrPath: '#000ff00' },
    t: { name: 'Температура', min: -50, max: 50, type: 'V', cls: 'axis', clrPath: '#FF0000' },
    p: { name: 'Давление', min: 0, max: 1000, type: 'V', cls: 'axis', clrPath: '#4F4FD9' },
    h: { name: 'Влажность', min: 0, max: 100, type: 'V', cls: 'axis', clrPath: '#FFFA40' },
  };
    
  const options = {
    padding: { top: 20, right: 10, bottom: 60, left: 30 },
    countVLabels: 3,
    axisTxtOffs: 8,
  };

// ReactDOM.hydrate(<Header />, document.getElementById('header'))
// ReactDOM.hydrate(<Footer />, document.getElementById('footer'))
// ReactDOM.hydrate(<MessageBoard messages={messages}/>, document.getElementById('message-board'))

ReactDOM.hydrate( <SvgChart options={options} axis={axis} />, document.getElementById('root'))

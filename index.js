require('@babel/register')({
  presets: ['@babel/preset-react']
})

const express = require('express'),
  mongodb = require('mongodb'),
  app = express(),
  // validator = require('express-validator'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  compression = require('compression'),
  url = 'mongodb://localhost:27017/SensDb',
  ReactDOMServer = require('react-dom/server'),
  React = require('react');

  const { body, validationResult } = require('express-validator');

const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

const Header = require('./components/header.jsx')
const Footer = require('./components/footer.jsx')
const MessageBoard = require('./components/board.jsx');
const { default: SvgChart } = require('./components/SvgChart.js');

mongodb.MongoClient.connect(url, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  app.use(compression())
  app.use(logger('dev'))
  app.use(errorHandler())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  // app.use(validator())
  app.use(express.static('public'))

  app.use((req, res, next) => {
    req.messages = db.collection('sensData_2021');
    return next()
  })

  // app.get('/getSensData', (req, res, next) => {
  //   console.log(req.body);
  //   return 0;
  // req.messages.find({}, { sort: { _id: -1 } }).toArray((err, docs) => {
  //   if (err) return next(err)
  //   return res.json(docs)
  // })
  // })

  app.post('/messages', (req, res, next) => {
    console.log(req.body)
    // req.checkBody('message', 'Invalid message in body').notEmpty()
    // req.checkBody('name', 'Invalid name in body').notEmpty()
    // let newMessage = {
    //   message: req.body.message,
    //   name: req.body.name
    // }
    // let errors = req.validationErrors()
    // if (errors) return next(errors)
    // req.messages.insert(newMessage, (err, result) => {
    //   if (err) return next(err)
    //   return res.json(result.ops[0])
    // })
  })

  app.get('/', (req, res, next) => {    
      res.render('index', {       
        chart: ReactDOMServer.renderToString(React.createElement(SvgChart , { options: options, axis: axis })),
       
      })   
  })

  // app.get('/', (req, res, next) => {
  //   // console.log(req.messages);
  //   req.messages.find({ _id: { $gte: new Date('01/05/2021') } }, { limit: (1 * 24) + 1, sort: { _id: 1 } }).toArray((err, docs) => {
  //     if (err) return next(err)

  //     // console.log('docs',docs);

  //     res.render('index', {
  //       header: ReactDOMServer.renderToString(Header()),
  //       footer: ReactDOMServer.renderToString(Footer()),
  //       messageBoard: ReactDOMServer.renderToString(React.createElement(MessageBoard, { messages: docs })),
  //       props: '<script type="text/javascript">var messages=' + JSON.stringify(docs) + '</script>'
  //     })


  //   })
  // })

  app.listen(3000);
  console.log('serv started');
})

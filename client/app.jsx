import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './App.css';
import SvgChart from './components/SvgChart';
import { getSensData, selDataSets } from './dataRdcrs/paths';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ruLocale from 'date-fns/locale/ru';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
// import AdapterDateFns from '@date-io/date-fns';

// const localeMap = {

//   ru: ruLocale,
// };

const axis = {
  _id: { name: 'Дата', min: 0, max: 0, type: 'H', cls: 'axis', clrPath: '#000ff00' },
  t: { name: 'Температура', min: -50, max: 50, type: 'V', cls: 'axis', clrPath: '#FF0000' },
  p: { name: 'Давление', min: 0, max: 1000, type: 'V', cls: 'axis', clrPath: '#4F4FD9' },
  h: { name: 'Влажность', min: 0, max: 100, type: 'V', cls: 'axis', clrPath: '#FFFA40' },
};

// const marker

const options = {
  padding: { top: 20, right: 10, bottom: 60, left: 30 },
  // fontH: 10, //?
  countVLabels: 3,
  axisTxtOffs: 8,
  // biggestDataStrBBoxWidth: 0,  
  // svgElm: null,
  // rcClient: null,
  // numHSeg: 0,
  // lnHSeg: 0, 
  // lnVSeg: 0,
};

function requestSensDataUrlencoded(data, range) {
  // if (document.forms[0].checkValidity()) {
  const body = 'startData=' + encodeURIComponent(data) +
    '&range=' + encodeURIComponent(range);
  const xhr = new XMLHttpRequest();
  xhr.timeout = 3000; // (в миллисекундах)
  xhr.open('POST', '/weather/getSensData', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(body);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // mArrDbData = JSON.parse(this.responseText);
      //if (mArrDbData.length !== 0) {
      //console.log('m_arrDbData len: %d', mArrDbData.length);

      // Draw();
      // mGraph.drawGraph(mArrDbData, parseInt(range));
      //}
    }
  }
  // }
}

function fetchJson(url) {
  return fetch(url)
    .then(request => request.text())
    .then(text => {
      return JSON.parse(text);
    })
    .catch(error => {
      console.log();
    });
}

// TODO: перенести статус загрузки в pathRdcr
function App() {
  const dispatch = useDispatch();
  const dataSets = useSelector(selDataSets);

  // const [date, setDate] = useState(new Date('01/05/2021'));//1635839818003
  const [date, setDate] = useState(Date.now());//1635839818003
  const [range, setRange] = useState(1);


  // NOTE! входные данные массив объектов, например: 
  // [
  //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
  //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
  //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
  // ]
  // функция возвращает объект со свойствами массивами
  // { 
  //      _id: ['2021-11-05', ...], 
  //      t: [21.2, ...],
  //      p: [36.9 ...],
  //      h: [12.5 ...]
  // }
  const convertArrObjectsToObjectPropertyArrays = (arrObjects) => {
    const out = {};
    if (arrObjects.length !== 0) {
      let o = arrObjects[0];
      for (const key in o) {
        out[key] = [];
      }

      arrObjects.forEach(el => {
        for (const key in el) {
          out[key].push(el[key]);
        }
      });
    }
    return out;
  }

  const fetchDataRange = (date, range) => {
    // console.log(date);
    const sz = options.getStrBoundSize('888', 'txt-axis');
    let stride = options.calcStride(sz.height, options.rcClient.right - options.rcClient.left, range);
    // console.log("stride",stride);

    dispatch(getSensData({ date: date, range: range, stride: stride, func: convertArrObjectsToObjectPropertyArrays }));//new Date(date).getDate() - 1
  }

  const addDateDay = (date, add) => {
    const dt = new Date(date);
    dt.setDate(dt.getDate() + add);
    return dt;
  }

  const onSetDate = (date, add = 0) => {
    setDate(date);
    fetchDataRange(date, range);
  }

  const onSetRange = (range) => {
    setRange(range);
    fetchDataRange(date, range);
  }

  const onAddDate = (add) => {
    setDate((prev) => {
      const res = addDateDay(prev, add);
      fetchDataRange(res, range);
      return res;
    });
  }

  useEffect(() => {
    console.log("App useEffect");
    fetchDataRange(date, range);
  }, []); // componentDidMount()

  return (
    <div className="App">
      <div id="controls">

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <DatePicker
            mask={'__.__.____'}
            label="Basic example"
            value={date}
            onChange={(newVal) => onSetDate(newVal)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={(e) => onAddDate(-1)} >One</Button>
          <Button onClick={(e) => onAddDate(1)} >Two</Button>
        </ButtonGroup>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={range}
          label="Age"
          onChange={(e) => onSetRange(e.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>

      </div>
      <div className="wrpSvg">
        <SvgChart options={options} axis={axis} dataSets={dataSets} />
      </div>

    </div>
  );
}

export default App;

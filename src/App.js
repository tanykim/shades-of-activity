import React, {useState} from 'react';
import './App.css';
import Legend from './Legend';
import Main from './Main';
import ByDay from './ByDay';
import ByMonth from './ByMonth';
import data2019 from './data/data-2019.json';
import data2020 from './data/data-2020.json';
import data2021 from './data/data-2021.json';
import data2022 from './data/data-2022.json';
import data2023 from './data/data-2023.json';

const allYearsData = {
  2019: data2019,
  2020: data2020,
  2021: data2021,
  2022: data2022,
  2023: data2023,
}

const YEARS = [2019, 2020, 2021, 2022, 2023];
const WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

function App() {
  const [year, setYear] = useState(YEARS[YEARS.length - 1]);
  const data = allYearsData[year];

  // this can be done in data generation phase but let's keep it here for now
  const sorted = Object.entries(data.types).sort((a, b) => b[1] - a[1]);
  const typeIds = sorted.reduce((acc, item, index) => {
    acc[item[0]] = index;
    return acc;
  }, {});
  const types = sorted.map(d => d[0]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="title">
          <span>{WORDS[Object.keys(data.types).length - 1]} Shades of Exercise in</span>
          <select value={year} onChange={(d) => setYear(d.target.value)} style={{paddingRight: 8}}>
            {YEARS.map(y => <option key={y} value={y} >{y}</option>)}
          </select>
        </div>
        <Legend types={sorted}/>
        <Main year={year} data={data.data} typeIds={typeIds} />
        <ByDay data={data.by_day} types={types}/>
        <ByMonth data={data.by_month} types={types}/>
        <div className="Footer">
          Created by <a href="http://tany.kim" target="_blank" rel="noopener noreferrer">Tanyoung Kim</a>&nbsp;&nbsp;|&nbsp;&nbsp;View code on <a href="https://github.com/tanykim/shades-of-exercise" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  );
}

export default App;

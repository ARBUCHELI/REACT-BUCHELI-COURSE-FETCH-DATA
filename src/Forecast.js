import React, { useState, useEffect } from "react";
import { get } from './mockBackend/fetch';

export default function Forecast() {
  const [data, setData] = useState();
  const [notes, setNotes] = useState({});
  const [forecastType, setForecastType] = useState('/daily');

  //Here we use the get function that is a way to simulate the fetch method.  The implementation is very similar:
  /*
    fetch(endpoint).then(response => {
        if(reponse.ok) {
            return response.json();
        }
        throw new Error('Request failed');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
        // Code to execute with JsonResponse
    })
    })
  */

  useEffect(() => {
    alert('Requested data from server...');
    get(forecastType).then((response) => {
      alert('Response: ' + JSON.stringify(response,'',2));
      setData(response.data);
    });
  }, [forecastType]);

  const handleChange = (index) => ({ target }) =>
    setNotes((prev) => ({
      ...prev,
      [index]: target.value
    }));
  //This is used to show a message because the effect won't be triggered until the first render will happen.
  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <div className='App'>
      <h1>My Weather Planner</h1>
      <div>
        <button onClick={() => setForecastType('/daily')}>5-day</button>
        <button onClick={() => setForecastType('/hourly')}>Today</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Summary</th>
            <th>Avg Temp</th>
            <th>Precip</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id}>
              <td>{item.summary}</td>
              <td> {item.temp.avg}°F</td>
              <td>{item.precip}%</td>
              <td>
                <input
                  value={notes[item.id] || ''}
                  onChange={handleChange(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
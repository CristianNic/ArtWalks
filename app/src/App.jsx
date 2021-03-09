import React from 'react';
import './App.css';
import Plot from 'react-plotly.js';

class App extends React.Component {

  state = {
    x: [1, 2, 3, 4, 5],
    y: [2, 6, 3, 7, 4],
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header plot">
          <div className="plot">
            <Plot
              data={[
                {
                  x: this.state.x,
                  y: this.state.y,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { blue: 'red' },
                },
                {
                  type: 'bar',
                  x: [1, 2, 3, 4, 5],
                  y: [2, 5, 3, 4, 6],
                },
              ]}
              layout={{ width: 520, height: 350, title: 'A Plot'}}
            />
          </div>
        </header>
      </div>
    )
  }
}

export default App;

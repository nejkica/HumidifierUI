import React from 'react';
import './App.css';
import Gumb from './components/gumb';

class App extends React.Component {

  state = { test: null }
  
  spremeni () {
    this.setState({ test: "bedak" });
    console.log('klik')
  }

  componentDidMount() {
    this.setState({ test: "debil" })

  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Gumb 
            test={this.state.test}
            spremeni={this.spremeni.bind(this)}
          />
          
        </header>
      </div>
    );
  }
}

export default App;

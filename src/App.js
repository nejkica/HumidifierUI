import React from 'react';
import Gumb from './components/gumb';
import Graf from './components/graf';
import Toast from './components/toast';

import handleScroll from './handleScroll';
import resetSize from './resetSize';
import ax from './axios';

import './style/App.css';
import './style/loader.css';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      podatki: {
        labels: [], 
        data: [],
        // mov: []
      },
      vhod: {
        koncniCas: [],
        zacetniCas: []
      },
      termin: '',
      scrollFaktor: 1
    };

    this.loaderDeka = React.createRef();

  }

  dodajVarray () {
    this.loaderDeka.current.style.visibility = 'visible';
    let d = this.state.termin;
    switch (d) {
      case 'mesecni':
        d = 'm';
        break;
      case 'tedenski':
        d = 't';
        break;
      default:
        d = 'd';
        break;
    }
    ax.pridobiPodatke(d, this.state.vhod.zacetniCas, (podatki) => {
      this.loaderDeka.current.style.visibility = 'hidden';
      this.setState({
        podatki: {
          labels: podatki.labels.concat(this.state.podatki.labels),
          data: podatki.data.concat(this.state.podatki.data),
          // mov: podatki.mov.concat(this.state.podatki.mov)
        },
        vhod: {
          koncniCas: podatki.labels[podatki.labels.length - 1],
          zacetniCas: podatki.labels[0]
        }
      });
    });
  }

  posljiPoizvedbo(termin, cb) {
    
    this.loaderDeka.current.style.visibility = 'visible';
    
    let t;
    if (termin === 'm') {
      t = 'mesecni';
    } else if ( termin === 't' ) {
      t = 'tedenski';
    } else {
      t = 'dnevni';
    }

    this.setState({
      termin: t
    });

    let d = new Date();
    d = d.toISOString();

    ax.pridobiPodatke(termin, d, (podatki) => {
      cb();
      this.loaderDeka.current.style.visibility = 'hidden';
      this.setState({
        podatki: {
          labels: podatki.labels,
          data: podatki.data,
          // mov: podatki.mov
        },
        vhod: {
          koncniCas: podatki.labels[podatki.labels.length - 1],
          zacetniCas: podatki.labels[0]
        }
      });
    });

  }

  nastaviScrollFaktor (sf) { this.setState({scrollFaktor: sf}) }

  sporociScrollFaktor () { return this.state.scrollFaktor; }
  
  mesecni () { // treba dodelat z moving average

    this.setState({ 
      termin: 'mesecni',
      scrollFaktor: 1
      });
    this.posljiPoizvedbo('m', () => resetSize());
  }

  tedenski () { // treba dodelat z moving average

    this.setState({ 
      termin: 'dnevni',
      scrollFaktor: 1
      });
    this.posljiPoizvedbo('t', () => resetSize());
  }

  dnevni () { // treba dodelat z moving average

    this.setState({ 
      termin: 'dnevni',
      scrollFaktor: 1
     });
    this.posljiPoizvedbo('d', () => resetSize());
  }

  componentDidMount() { //dnevni prikaz je default
        
    handleScroll(this.sporociScrollFaktor.bind(this), this.nastaviScrollFaktor.bind(this), () => {
      this.dodajVarray();
    });

    this.posljiPoizvedbo('d', () => {});
  }
// -----------------------------------------------
  render () {

    return (
      <div className="App">
        <div 
          className="loaderDeka"
          ref={this.loaderDeka}
          >
          <div className="loaderKrog" />
        </div>
        <Toast />
        <Graf 
          podatki={this.state.podatki}

        />
        <div className="gumbi">
          <Gumb 
            opis='dnevni'
            spremeni={this.dnevni.bind(this)}
          />
          <Gumb 
            opis='tedenski'
            spremeni={this.tedenski.bind(this)}
          />
          <Gumb 
            opis='mesecni'
            spremeni={this.mesecni.bind(this)}
          />

        </div>
      </div>
    );
  }
}

export default App;

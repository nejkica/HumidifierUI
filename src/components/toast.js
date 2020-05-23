import React from 'react';

import ax from '../axios.js';

import '../style/toast.css';
import '../style/toastIndikator.css';

class Toast extends React.Component {

	constructor(props) {
		super(props);
		this.toggleClass= this.toggleClass.bind(this);
		this.drag = this.drag.bind(this);
		this.state = {
			visible: false,
			vlaga: 0,
			temperatura: 0
		};

		// this.toastEl = React.createRef();

	}

	sqlZadnjiPodatek() {
		ax.zadnjiPodatek((zp) => {
			this.setState({
				vlaga: zp.vlaga,
				temperatura: zp.temperatura
			})
		})
	}

	toggleClass() {

		if (this.state.visible === false) { //ampak sem ravnokar pritisnil naj ga pokaže ...
			this.sqlZadnjiPodatek();
			this.interval = setInterval(() => { this.sqlZadnjiPodatek()}, 5000);
		} else {
			clearInterval(this.interval);
		}

		this.setState({ visible: !this.state.visible });
	}

	drag (e) {
		console.log(e.touches[0].clientX)
		console.log('bumbar');
		this.toggleClass();
	}

	componentDidMount () {
		this.toastEl.addEventListener('touchmove', this.drag, false);
		// this.visina = document.querySelector('.nivoKolicina');
		// console.log(this.visina)
	}

	render () {
		// console.log(this.state);
		return (
			<div 
				className={this.state.visible === true ? 'toast' : 'toast toastSkrij'}
				onClick={this.toggleClass}

				ref={elem => this.toastEl = elem}
				>
				<div className="toastPrikaz">
					<Indikator
						vlaga={this.state.vlaga}
						temperatura={this.state.temperatura}
					 />
				</div>
				<div 
					className="toastRocica"
					
					>
					<div className="toastRocicaPoravnava">
						<div className="crtica"></div>
						<div className="crtica"></div>
						<div className="crtica"></div>


					</div>
				</div>
			</div>

		)
	}


}

class Indikator extends React.Component {

	componentDidUpdate() {
		this.nivo.style.height = this.props.vlaga + '%';
	}

	render () {
		return (
			<div className="indikator">
				<div className="nivo">
					<div 
						className="nivoKolicina"
						ref={el => this.nivo = el}
					/>
				</div>
				<div className="indikatorTekst">
					<h1>Trenutne vrednosti</h1>
					<span className="indikatorVrednosti">
						<p><span>Vlaga:</span><span> {this.props.vlaga.toLocaleString()}</span></p>
						<p><span>Temperatura:</span><span>{this.props.temperatura.toLocaleString()}</span></p>
					</span>
				</div>
			</div>
		)
	}

}

export default Toast;
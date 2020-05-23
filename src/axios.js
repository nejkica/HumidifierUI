import axios from 'axios';

const naslov = 'http://192.168.123.184:3000/';

const pridobiPodatke = (termin, koncniCas, cb) => {
	axios.get(naslov + 'd/' + termin + '/' + koncniCas)
		.then((res) => {
			let dataJson = res.data;
			let lbl = [];
			let data = [];
			let mov = [];

			for(let i = 0; i < dataJson.length; i++) {
				lbl.push(dataJson[i].cas);
				data.push(dataJson[i].vlaznost);
				mov.push(dataJson[i].mov);
			}

			let lastMov = mov[mov.length - 1];

			let kolikoShifta;

			termin === 'm' ? kolikoShifta = 3 : kolikoShifta = 8;
			
			for(let j = 0; j < kolikoShifta; j++) { //zamik (shift) zaradi lag-a krivulje.
				mov.shift();
				mov.push(lastMov);
			}

			// let podatki = {}

			if (termin !== 'd') data = mov;


			let podatki = {
				labels: lbl,
				data: data
				// mov: mov
			}

			cb(podatki);
		})
}

const zadnjiPodatek = (cb) => {
	axios.get(naslov + 'zadnjiPodatek')
		.then((res) => {
			let dataJson = res.data;
			let lbl = dataJson[0].cas;
			let vlaga = dataJson[0].vlaznost;
			let temperatura = dataJson[0].temperatura;
		
			// console.log(res.data);

			let podatki = {
				labels: lbl,
				vlaga: vlaga,
				temperatura: temperatura
			}

			cb(podatki);
		})
}

export default { pridobiPodatke, zadnjiPodatek };
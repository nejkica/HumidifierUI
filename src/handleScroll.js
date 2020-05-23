let handleScroll = (lsf, nastaviScrollFaktor, cb) => {
	const grafWrap = document.querySelector('.grafWrap');
	const grafAreaWrapper = document.querySelector('.grafAreaWrapper');
	const canvas = document.querySelector('.chartjs-render-monitor');

	let pLokacijaScrolla = 0;
	let lokacijaScrolla = 0;



	let grafWrapWidth = 0;
	let grafAreaWrapperWidth = 0;
	let novaSirina = 0;
	let lokacijaScrollaFaktor = 1;
	let pLokacijaScrollaFaktor = 0;
	window.onresize = () => grafWrapWidth = grafWrap.offsetWidth; // ker se ob resizanju okna tudi ta element raztegne

	// console.log(grafWrap.offsetWidth);

	grafWrap.onscroll = () => {
		grafWrapWidth = grafWrap.offsetWidth;
		grafAreaWrapperWidth = grafAreaWrapper.offsetWidth;

		pLokacijaScrollaFaktor = lokacijaScrollaFaktor;
		lokacijaScrollaFaktor = lsf();
		if(lokacijaScrollaFaktor === 1 && pLokacijaScrollaFaktor !== 1) { pLokacijaScrolla = 0 };

		novaSirina = grafWrapWidth + grafAreaWrapperWidth;
		lokacijaScrolla = grafWrap.scrollLeft / grafWrapWidth;
		// console.log(lokacijaScrolla + ' ' + novaSirina);

		if (lokacijaScrolla < pLokacijaScrolla && lokacijaScrolla < (-0.99 * lokacijaScrollaFaktor) ) {
			// console.log(lokacijaScrolla);
			lokacijaScrollaFaktor += 1;
			nastaviScrollFaktor(lokacijaScrollaFaktor);
			grafAreaWrapper.style.width = novaSirina + 'px';
			canvas.style.width = novaSirina + 'px';
			
			pLokacijaScrolla = lokacijaScrolla;

			cb();
		}
	}
}

export default handleScroll;
let resetSize = () => {
	const grafWrap = document.querySelector('.grafWrap');
	const grafAreaWrapper = document.querySelector('.grafAreaWrapper');
	const canvas = document.querySelector('.chartjs-render-monitor');

	grafAreaWrapper.style.width = '200vw';
	canvas.style.width = '100%';
	grafWrap.scrollLeft = 0;

}

export default resetSize;
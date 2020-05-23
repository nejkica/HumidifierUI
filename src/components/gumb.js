import React from 'react';
import '../style/gumb.css';

const Gumb = (props) => {

	return (
		<div className="gumb" onClick={ props.spremeni }>
			<span className="gumbText">
				{ props.opis }
			</span>	
		</div>
	)

}

export default Gumb;
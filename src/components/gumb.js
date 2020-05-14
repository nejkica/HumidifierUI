import React from 'react';


const Gumb = (props) => {

	return (
		<div className="gumb" onClick={ props.spremeni }>
			Gumb { props.test }
		</div>
	)

}

export default Gumb;
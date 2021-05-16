import React,{Fragment} from 'react'

const ProgressBar = (props) => {
    return (
        <Fragment>
              
              
				<ul className="active-button">
                    <li className={props.b1}>
                        <span className="round-btn">1</span>
                    </li>
                    <li className={props.b2}>
                        <span className="round-btn">2</span>
                    </li>
                    <li  className={props.b3}>
                        <span className="round-btn">3</span>
                    </li>
				</ul>
					<h4>{props.title}</h4>

        </Fragment>
    )
}

export default ProgressBar

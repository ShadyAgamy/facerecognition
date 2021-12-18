import React from 'react';

import "./imageLinkForm.css";

export default function ImageLinkForm({onInputChange, onButtonSubmit}) {
    return (
        <div className="form ">
            <p className="f3 ">
                {'This Magic Brain will detect faces in your pictures. Git it a try.'}
            </p>
            <div className=" center">
                <div className="pa4 br3 shadow-5 center">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-red" onClick={onButtonSubmit}>Detect</button>
                </div>
                
            </div>
        </div>
    )
}

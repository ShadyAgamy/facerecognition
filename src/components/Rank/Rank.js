import React from 'react'

export default function Rank({name,rank}) {
    return (
        <div className="center flex flex-column" style={{alignItems:"center"}}>
            <div className="white f3 ">
               <h4 className='mv2'><span style={{"textTransform": "capitalize"}}>{name}</span>, yout current rank is...</h4> 
            </div>
            <div className="white f1 ">
                {rank}
            </div>
        </div>
        
        
    )
}

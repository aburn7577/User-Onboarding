import React from 'react'

function Members({ details }) {
    if (!details) {
        return <h3>Working fetching your member&apos;s details...</h3>
    }

    return (
        <div className='friend container'>
            <h2>{details.first_name}&nbsp; {details.last_name}</h2>
            <p>Email: {details.email}</p>

        </div>
    )
}

export default Members

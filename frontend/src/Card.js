import React from 'react'

const Card = ({ card }) => {
    const statusToColor = {
        "Application Submitted": "card-in-progress",
        "Upcoming OA": "card-in-progress",
        "Completed OA": "card-in-progress",
        "Upcoming Interview": "card-in-progress",
        "Completed Interview": "card-in-progress",   
        "Offer Received": "card-offer",
        "Rejected": "card-rejected"
    };

    return (
        <div className={`card ${statusToColor[card.status]}`}>
            <div className='card-inner'>
                <p className='card-company'>{card.company}</p>
                <p className='card-position'><strong>Position: </strong>{card.position}</p>
                <p className='card-dateApplied'><strong>Date applied: </strong>{card.dateApplied}</p>
                <p className='card-salary'><strong>Salary: </strong>{card.salary}</p>
                <p className='card-notes'><strong>Notes: </strong>{card.notes}</p>
                <p className='card-status'><strong>Status: </strong>{card.status}</p>
            </div>
        </div>
    )
}

export default Card
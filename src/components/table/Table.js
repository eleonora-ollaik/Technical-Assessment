import React from 'react'
import './Table.css'

function Table(props) {
    
    let {newEntry} = props;
    let latestPrice = newEntry.prices[0].price;
    let latestDate = newEntry.prices[0].date;

    return (
        <div>
            <table className='center'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Chosen Date</th>
                            <th>Latest Price</th>
                            <th>Social Media</th>
                            <th>Posts</th>
                            <th>Recommendation</th>

                        </tr>
                    </thead>

                    <tbody>
                       <tr>
                           <td>{newEntry.symbol}</td>
                           <td>{latestDate}</td>
                           <td>{latestPrice}</td>
                           <td>{newEntry.socialMedia}</td>
                           <td>{newEntry.posts}</td>
                           <td>{newEntry.rec}</td>
                       </tr>
                    </tbody>
            </table>
        </div>
    )
}

export default Table

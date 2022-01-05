import React from 'react'

export default function DogList({ dogData, ...rest }) {
    console.log(dogData, rest);
    if (!dogData) {
        return <></>
    }
    return (
        <>
            <h1>All dog list</h1>
            <ul>
                {dogData.map(a => <li key={a.message}>
                    <img src={a.message} style={{
                        width: '100%',
                    }} />
                    <p>{a.message}</p>
                </li>)}
            </ul>
        </>
    )
}
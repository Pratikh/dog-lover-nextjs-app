import React from 'react'
import DogList from '../components/DogList'
import axios from "axios";

export default function DogsList({ dogData }) {
    return (
        <>
            <title>Dogs List</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="An section must be placed in supervisord.conf in order for superslacker to do its work. See the Events chapter in the Supervisor manual for more information about event listeners." />
            <link rel="icon" href="/favicon.ico" />
            <DogList dogData={dogData} />
        </>
    )
}

export async function getServerSideProps() {
    var result = await axios.get("https://dog.ceo/api/breeds/list/all");
    var allBreadImage = [];
    Object.keys(result.data.message).map((a) => {
        allBreadImage.push(axios.get("https://dog.ceo/api/breed/" + a + "/images/random"));
    });

    var data = await Promise.all(allBreadImage);
    return {
        props: {
            dogData: data.map(a => a.data),
        },
    };
}

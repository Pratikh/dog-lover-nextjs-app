import React from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import AOS from 'aos';
import '../node_modules/aos/dist/aos.css';


export default function DogList({ dogData, ...rest }) {

    React.useEffect(() => {
        AOS.init({
            once: true
        });
    }, [])
    if (!dogData) {
        return <></>
    }
    return (
        <>
            <h1>All dog list</h1>
            <div>
                <div className='job-cards-container'>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                    >
                        <Masonry gutter="10px">
                            {dogData.map((a) => (
                                <img
                                    data-aos='slide-up'
                                    key={a.message}
                                    src={a.message}
                                    style={{ width: "100%", display: "block" }}
                                    alt=""
                                />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>

        </>
    )
}
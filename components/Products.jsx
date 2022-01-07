import Link from 'next/link';
import React from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


export default function DogList({ productList, message, ...rest }) {
    if (!productList && !message) {
        return <h1>Loading data</h1>
    }

    if (message === 'done' && !productList?.length) {
        return <h1>Sorry no product found</h1>
    }
    return (
        <>
            <h1>Products</h1>
            <div>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry gutter="10px">
                        {productList.map((a) => (
                            <div key={a.name}>
                                <img
                                    data-aos='slide-up'

                                    src={'https://a2pbecdn.artoreal.com/catalog/product' + a.media_gallery_entries[0].file}
                                    style={{ width: "100%", display: "block" }}
                                    alt={a.name}
                                />
                                <Link target="_blank"
                                    href={'https://artoreal.com/product/' + a.extension_attributes.product_url}>
                                    <h3>{a.name}</h3>
                                </Link>
                                <h3>{a.price}</h3>
                            </div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </>
    )
}
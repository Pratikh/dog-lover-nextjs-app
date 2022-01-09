import Link from "next/link";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/image";
import { motion } from "framer-motion";

const myLoader = ({ src, width, quality }) => {
  return `https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png`;
};
export default function DogList({ productList, message, ...rest }) {
  if (!productList && !message) {
    return <h1>Loading data</h1>;
  }
  if (message === "done" && !productList?.length) {
    return <h1>Sorry no product found</h1>;
  }
  return (
    <>
      <h1>Products</h1>
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}>
          <Masonry gutter="10px">
            {productList.map((a) => (
              <div key={a.name}>
                <Link
                  target="_blank"
                  href={
                    "https://artoreal.com/product/" +
                    a.extension_attributes.product_url
                  }
                >
                  <motion.div
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="imageList"
                  >
                    <Image
                      quality={66}
                      {...a.imageProps}
                      layout="responsive"
                      src={
                        "https://a2pbecdn.artoreal.com/catalog/product" +
                        a.media_gallery_entries[0].file
                      }
                      placeholder="blur"
                      blurDataURL={`${
                        "https://a2pbecdn.artoreal.com/catalog/product" +
                        a.media_gallery_entries[0].file
                      }?width=${parseInt(
                        (a.imageProps.width * 1) / 100
                      )}&height=${parseInt((a.imageProps.height * 1) / 100)}`}
                      alt={a.name}
                    />

                    <h3>{a.name}</h3>
                    <p>By {a.extension_attributes.seller_name}</p>

                    <h3> &#8377; {Number(a.price).toFixed()}</h3>
                  </motion.div>
                </Link>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

import Image from "next/image";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "framer-motion";

export default function DogList({ dogData, ...rest }) {
  if (!dogData) {
    return <></>;
  }
  return (
    <>
      <h1>All dog list</h1>
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="10px">
            {dogData.map((a) => (
              <motion.div
                key={a.src}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.5 },
                }}
                whileTap={{ scale: 1 }}
                className="motionDivImage"
              >
                <Image
                  src={a.src}
                  width={a.width}
                  height={a.height}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={`${a.src}?width=${parseInt(
                    (a.width * 1) / 100
                  )}&height=${parseInt((a.height * 1) / 100)}`}
                  alt=""
                />
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

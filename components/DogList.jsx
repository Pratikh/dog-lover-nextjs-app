import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
              <img
                key={a.message}
                src={a.message}
                style={{ width: "100%", display: "block" }}
                alt=""
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

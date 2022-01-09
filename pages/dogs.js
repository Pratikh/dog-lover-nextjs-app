import React from "react";
import DogList from "../components/DogList";
import axios from "axios";
var Jimp = require("jimp");

export default function DogsList({ dogData }) {
  return (
    <>
      <title>Dogs List</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="An section must be placed in supervisord.conf in order for superslacker to do its work. See the Events chapter in the Supervisor manual for more information about event listeners."
      />
      <link rel="icon" href="/favicon.ico" />
      <DogList dogData={dogData} />
    </>
  );
}

export async function getStaticProps() {
  var result = await axios.get("https://dog.ceo/api/breeds/list/all");
  var allBreadImage = [];
  Object.keys(result.data.message).map((a) => {
    allBreadImage.push(
      axios.get("https://dog.ceo/api/breed/" + a + "/images/random")
    );
  });

  const menu = await axios.get("https://api.artoreal.com/rest/V1/menu");
  var data = await Promise.all(allBreadImage);
  const dogsArray = data.map((a) => a.data);
  const finalData = [];
  const arrayOfPromise = [];
  dogsArray.forEach((a) => {
    console.log(a);
    const promise = new Promise((resolve) => {
      Jimp.read(a.message).then((data) => {
        const tempData = {
          width: data.bitmap.width,
          height: data.bitmap.height,
          src: a.message,
        };
        finalData.push(tempData);
        resolve();
      });
    });
    arrayOfPromise.push(promise);
  });
  await Promise.all(arrayOfPromise);
  return {
    props: {
      dogData: finalData,
      menuData: menu.data,
    },
    revalidate: 60 * 60,
  };
}

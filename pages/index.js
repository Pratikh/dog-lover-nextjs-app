import styles from "../styles/Home.module.css";
import Meta from "../components/Meta";
import Image from "next/image";
import React from "react";
import axios from "axios";

export default function Home({ dogList }) {
  React.useEffect(() => {
    // const url = "/api/hello";
    // axios.post(url).then(confirm.log)
  }, []);
  return (
    <>
      <Meta />
      <div className={styles.container}>
        <main className={styles.main}>
          <Image
            width={500}
            height={400}
            src="/cute_little_girl_is_standing_with_samoyed_dog_near_wood_fence_wearing_blue_printed_dress_hd_cute.jpg"
          />
          <ul>
            {Object.keys(dogList).map((bread) => (
              <React.Fragment key={bread}>
                <li>{bread}</li>
                {!!dogList[bread].length && (
                  <ul>
                    {dogList[bread].map((subBread) => (
                      <li key={subBread}>{subBread}</li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

//https://dog.ceo/api/breeds/list/all

export async function getServerSideProps() {
  const result = await fetch("https://dog.ceo/api/breeds/list/all");
  const json = await result.json();
  const menu = await axios.get("https://api.artoreal.com/rest/V1/menu");
  console.log(menu);
  return {
    props: {
      menuData: menu.data,
      dogList: json.message,
    },
  };
}

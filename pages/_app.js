import "../styles/globals.css";
import Navigation from "../components/Navigation";
import axios from "axios";

function MyApp({ Component, pageProps,...rest }) {
  console.log(pageProps,rest);
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {test:'hello'}, // will be passed to the page component as props
  }
}

export default MyApp;

// export async function getServerSideProps() {
//   const menu = await axios.get("https://api.artoreal.com/rest/V1/menu");
//   console.log(menu);
//   return {
//     props: {
//       menuData: menu.data,
//     },
//   };
// }

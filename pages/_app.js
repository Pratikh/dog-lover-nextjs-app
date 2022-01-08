import "../styles/globals.css";
import Navigation from "../components/Navigation";
import axios from "axios";

function MyApp({ Component, pageProps, ...rest }) {
  return (
    <>
      <Navigation menuData={pageProps.menuData} />
      <Component {...pageProps} />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: { test: "hello" }, // will be passed to the page component as props
  };
}

export default MyApp;


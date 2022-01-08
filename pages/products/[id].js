import React from "react";
import Products from "../../components/Products";
import axios from "axios";

export default function ProductsList({ productList, message }) {
  return (
    <>
      <title>Artoreal Product list</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scra"
      />
      <link rel="icon" href="/favicon.ico" />
      <Products productList={productList} message={message} />
    </>
  );
}

export async function getStaticProps(context) {
  var result = await axios.get(
    "https://api.artoreal.com/rest/V1/lof-producttags/products/" +
      context.params.id
  );

  const data =
    "https://api.artoreal.com/rest/V1/products?&searchCriteria[filterGroups][3][filters][1][field]=status&searchCriteria[filterGroups][3][filters][1][value]=1&searchCriteria[filterGroups][0][filters][0][field]=entity_id&searchCriteria[filterGroups][0][filters][0][value]=" +
    result.data.map((a) => a.sku).join() +
    "&searchCriteria[filterGroups][0][filters][0][condition_type]=in&searchCriteria[sortOrders][0][field]=name&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[currentPage]=1&searchCriteria[pageSize]=50&%20%20%20%20fields=items[id,name,qty,sku,type_id,price,media_gallery_entries,extension_attributes[seller_name,product_url,is_saleable,min_customization_price,is_limited_edition]],total_count";
  const productList = await axios.get(data);
  return {
    props: {
      productList: productList.data.items,
      message: "done",
    },
    revalidate: 60 * 60,
  };
}

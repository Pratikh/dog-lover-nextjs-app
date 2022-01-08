import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const MyHoveredList = ({ data }) => {
  const [isHovered, setHover] = React.useState(false);
  const onMouseEnter = React.useCallback(() => {
    setHover(true);
  }, []);
  const onMouseLeave = React.useCallback(() => {
    setHover(false);
  }, []);
  if (!data.children_data) {
    return <></>;
  }
  return (
    <li key={data.name} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {data.name}
      {isHovered && (
        <ul>
          {data.children_data.map((b) => (
            <li key={b.name}>
              <Link href={"/products/" + b.code}>{b.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default function Navigation({ menuData }) {
  return (
    <header>
      <div className={styles.header}>
        <Link href="/upload">Upload Photo</Link>
        <Link href="/dogs">Dog List</Link>
        <Link href="/dogs">Dog List</Link>
        {menuData && (
          <ul className="parentList">
            {menuData[0].children_data.map((data) => (
              <MyHoveredList data={data} key={data.name} />
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

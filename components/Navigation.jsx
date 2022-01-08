import React from 'react'
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Navigation() {
    return (
        <header>
        <div className={styles.header}>
          <Link href='/upload'>Upload Photo</Link>
          <Link href='/dogs'>Dog List</Link>
          <Link href='/dogs'>Dog List</Link>
        </div>

      </header>
    )
}

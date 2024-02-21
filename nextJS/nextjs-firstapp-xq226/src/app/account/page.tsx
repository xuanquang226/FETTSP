'use client'
import Link from "next/link";
import styles from "@/styles/app.module.css";
import Body from "@/components/body";
import { useEffect } from "react";
import useSWR from "swr";

const XQ226 = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "http://localhost:8080/book",
        fetcher
        , {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    console.log(data)

    // Cách fetchData sử dụng trong useEffect
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch("http://localhost:8080/book");
    //         const data = await response.json();
    //         console.log("check res: ", data);
    //     }
    //     fetchData();
    // })
    if (!data) {
        return <div>Loading</div>;
    }
    return (
        <div>
            <div>
                {data?.length}
            </div>
            <ul>
                <li className={styles.red}>
                    <Link href="/account/admin" className={styles.red}>Admin</Link>
                </li>
                <li>
                    <Link href="/account/user">User</Link>
                </li>
            </ul>
            <Body
                books={data?.sort((a: any, b: any) => b.id - a.id)}
            />
        </div>

    )
}

export default XQ226;


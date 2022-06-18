import Hero from "../components/Hero/Hero";
import { useRef } from 'react';
import Products from "./Products";

export default function Home() {

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView();

    return (
        <>
            <Hero func={executeScroll} />

                <div ref={myRef}>
                    <Products />
                </div>

        </>
    )
}
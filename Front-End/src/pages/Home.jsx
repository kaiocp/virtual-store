import CardsHome from "../components/CardsHome/CardsHome";
import Hero from "../components/Hero/Hero";
import { useRef } from 'react';
import Products from "./Products";

export default function Home() {

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView();

    return (
        <>
            <Hero func={executeScroll} />
            <CardsHome />
                <div ref={myRef}>
                    <Products />
                </div>

        </>
    )
    }
import CardsHome from "../components/CardsHome/CardsHome";
import Hero from "../components/Hero/Hero";
import ModalProduto from "../components/modalProduto/modalProduto";

export default function Home() {

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView();

    return (
        <>
            <Hero func={executeScroll} />
            <CardsHome />
            <ModalProduto/>
        </>
    )
}
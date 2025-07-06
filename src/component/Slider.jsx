import { useEffect, useRef, useState } from "react"
import { loadTwists } from "@/service/TwistService";

import SliderChild from "./SliderChild";
import Card from "./Card";

const initalTwists = 3;
const extraTwists = 2;

export default function Slider() {
    const mainRef = useRef(null);
    const [twists, setTwists] = useState([]);

    function loadMoreTwists(limit, offset) {        
        setTwists([...twists, ...loadTwists(limit, offset)])
    }

    function scrollTopOnMount() {
        mainRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }

    function loadTwistsOnMount(){
        loadMoreTwists(initalTwists, 0);
    }

    useEffect(scrollTopOnMount, []);
    useEffect(loadTwistsOnMount, []);

    return (
        <main
            ref={mainRef}
            className='h-lvh snap-y snap-mandatory overflow-y-scroll scroll-smooth'
        >
            {
                twists.map((twist, key) => (
                    <SliderChild
                        key={key}
                        index={key}
                        totalElements={twists.length}
                        extraElements={extraTwists}
                        getElements={loadMoreTwists}
                    >
                        <Card twist={twist} />
                    </SliderChild>
                ))
            }
        </main>
    )
}
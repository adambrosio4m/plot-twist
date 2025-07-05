import { useEffect, useRef, useState } from "react"
import debounce from "../util/debounce";

const twists = [
    {
        "description": "Un gruppo di soldati nella giungla viene cacciato da una creatura aliena invisibile e letale. ma poi questa creatura finisce per innamorarsi di un soldato",
        "name": "Predator ma non mi ricordo la modifica"
    },
    {
        "description": "ce stanno sti omini spaziali che vivono in un supermercato specifico ma sto supermercato sta per fallire quindi rubano il talento a tutti i più forti cassieri di altri supermercati. però organizzano una partita a basket con questi. Di che film sto parlando ?",
        "name": "Space Pam"
    },
    {
        "description": "Allora c'é questo bambino con poteri soprannaturali, e a na certa ha una visione e legge una scritta: maschile, femminile, non binario, fluido, assessuato, ........., ma ne manca uno",
        "name": "Il sesto sesso"
    },
    {
        "description": "Il figlio di hulk va in carcere e viene condannato a morte. Muore. Una lettera di differenza",
        "name": "Il figlio verde"
    },
    {
        "name": "Sfinit",
        "description": "ce sta sto cavallo bellissimo stupendo selvaggio. Gli umani lo vogliono catturare ma.... ci riescono subito al primo colpo perché il cavallo si stanca facilmente"
    },
    {
        "name": "Bastardi senza Gloria",
        "description": "Un gruppo di soldati americani va in Germania ad uccidere tedeschi, ma dimenticano la loro amica a casa"
    },
    {
        "name": "Schindler's fist",
        "description": "Allora il film di spielberg su quel tedesco che per salvare gli ebrei dai campi di concentramento gli dava un cazzotto"
    },
    {
        "name": "La bella e la restìa",
        "description": "Ce una principessa e una sua amica che é una persona non del tutto convinta o mal disposta a cedere al volere altrui o ad assumersi un determinato impegno."
    },
    {
        "name": "Minority Repost",
        "description": "Azione/sci-fi: una branca speciale della polizia utilizza un metodo innovativo per anticipare le ricondivisioni dei post su instagram. Il nome di questo processo è il titolo del film"
    },
    {
        "name": "Il corto",
        "description": "Un film degli anni 90 dove uno basso torna in vita per vendicare la ragazza"
    },
    {
        "name": "Mezzogiorno di cuoco",
        "description": "Nell'ora più calda della giornata, nel periodo più afoso nel posto più torrido diciamo come ad agosto a roma e uno chef si prepara a prendersi il suo momento"
    },
    {
        "name": "Duce",
        "description": "Su un pianeta lontano viene instaurata una dittatura e anche il pianeta stesso prenderà il nome dal dittatore dando il titolo alla saga"
    },
    {
        "name": "Pacific Kim",
        "description": "Trama: La corea del nord ha intessuto rapporti amichevoli con tutti i paesi del mondo"
    },
    {
        "name": "Qualcuno volò sul lido del cuculo",
        "description": "Una figura misteriosa ha effettuato manovre aeree sopra uno stabilimento di Ostia di proprietà di un particolare uccello"
    },
    {
        "name": "Bambo",
        "description": "Un ex veterano va in vietnam ma sconvolto dalla violenza decide di dedicarsi alla produzione di bamba"
    },
    {
        "name": "Grimes of the future",
        "description": "Gli esseri umani si stanno evolvendo, non provano più dolore. Grimes è un'artista che ha fatto carriera con questa mutazione"
    },
    {
        "name": "Perfect Gays",
        "description": "La storia di un uomo serenamente soddisfatto della sua semplice vita di omosessuale a Tokyo mentre si gode i suoi hobby e il suo umile lavoro"
    },
    {
        "name": "Gli spiriti dell'Imola",
        "description": "Nella città di Imola un uomo è sconvolto quando il suo migliore amico interrompe improvvisamente la loro amicizia di una vita"
    },
    {
        "description": "scoppia un epidemia zombie. Un gruppo di persone, al crepuscolo, si mettono in viaggio verso una famosa isola toscana, sperando di sopravvivere.",
        "name": "dal tramonto all'elba"
    },
    {
        "description": "è la storia di un gruppo di mafiosi a New York, ma in questa versione, il personaggio protagonista è una donna, che è l'unica intelligente e acculturata di tutta la nazione.",
        "name": "c'era una colta in america"
    },
    {
        "description": "c'è un carcerato che è recluso da molto tempo, e inizia a consultare molti libri che parlano di questi insetti giallo e neri, e grazie a questo si sente un po' meno recluso.",
        "name": "le api della libertà"
    },
    {
        "description": "il figlio di un re africano va in America per trovare una sposa, ma alla fine finisce per andare in fissa con quelle cose che in autunno cadono. E così si scorda del motivo principale per cui era partito.",
        "name": "il principe cerca foglie"
    },
    {
        "description": "un professore molto amato dai suoi studenti, è alla ricerca disperata di un appartamento all'ultimo piano. Ma ogni volta che prova a comprarlo o ad affittarlo lo anticipano e glielo sfilano da sotto le mani.",
        "name": "l'attico fuggente"
    },
    {
        "description": "un cane deve salvare la vita di una bambina, ma in questa versione ha il nome di un cereale.",
        "name": "malto"
    }
]

for (let i = twists.length - 1; i > 0; i--) {
    // Genera un indice casuale tra 0 e i
    const j = Math.floor(Math.random() * (i + 1));

    // Scambia gli elementi twists[i] e twists[j]
    [twists[i], twists[j]] = [twists[j], twists[i]];
}

export default function Slider() {
    const mainRef = useRef(null);
    const [showTitle, setShowTitle] = useState(false);
    const [enable, setEnable] = useState(true);

    function toggleTitle() {
        enable && setShowTitle(!showTitle);
    }

    const debouncedToggleTitle = debounce(toggleTitle, 75);

    function resetShowTitle() {      
        setShowTitle(false);
        setEnable(false);
    }

    function getName(title) {
        if (showTitle) {
            return title
        }
        else {
            const regexp = /\S/gi;
            return title.replaceAll(regexp, '*')
        }
    }

    function scrollTopOnMount() {
        mainRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }

    function enableOnScrollEnd() {        
        setEnable(true);
    }

    const debounceEnableOnScrollEnd = debounce(enableOnScrollEnd, 75)

    useEffect(scrollTopOnMount, []);

    return <main ref={mainRef} onScroll={resetShowTitle} onScrollEnd={debounceEnableOnScrollEnd} className='h-lvh snap-y snap-mandatory overflow-y-scroll scroll-smooth'>
        {twists.map((twist, key) => <div key={key} className='h-lvh snap-start snap-always'>
            <div className='h-lvh flex flex-col justify-center items-center'>
                <div onClick={debouncedToggleTitle} className='cursor-pointer card max-w-md w-full p-4 rounded-lg shadow-md'>
                    <h2 className="text-xl font-semibold">{getName(twist.name)}</h2>
                    <p className="mt-2">
                        {twist.description}
                    </p>
                </div>
            </div>
        </div>)}
    </main>
}
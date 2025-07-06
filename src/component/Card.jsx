import { useState } from "react";

export default function Card({ twist }) {
    const [showTitle, setShowTitle] = useState(false);

    function toggleTitle() {
        setShowTitle(!showTitle);
    }

    function getName(title) {
        const regexp = /\S/gi;
        
        if (showTitle) {
            return title
        }
        else {
            return title.replaceAll(regexp, '*')
        }
    }

    return (
        <div
            onClick={toggleTitle}
            className='cursor-pointer card max-w-md w-full p-4 rounded-lg shadow-md'
        >
            <h2 className="text-xl font-semibold">{getName(twist.name)}</h2>
            <p className="mt-2">
                {twist.description}
            </p>
        </div>
    )
}
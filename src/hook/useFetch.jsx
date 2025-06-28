import { useEffect, useState } from 'react';

export default function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleFetch(){
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(error => setError(JSON.stringify(error)))
            .finally(() => setLoading(true))
    }

    useEffect(handleFetch, []);

    return {loading, data, error}
}
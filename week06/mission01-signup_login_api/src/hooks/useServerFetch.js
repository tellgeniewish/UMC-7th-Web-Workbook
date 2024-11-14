// src/hooks/useServerFetch.js
import { useEffect, useState } from "react";
import {serverApi} from "../apis/server-api";

const useServerFetch = (url, method = 'GET', requestData = null) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                //const response = await serverApi.post(url);
                const response = method === 'POST'
                    ? await serverApi.post(url, requestData)
                    : await serverApi.get(url);
                setData(response.data);
                setIsError(false);
            } catch(error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        if (method === 'POST' && requestData) {
            fetchData();
        }
    }, [url]);

    return {data, isLoading, isError}
}

export default useServerFetch;
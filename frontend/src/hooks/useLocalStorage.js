import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue = null) {
    let currentValue = localStorage.getItem(key) || initialValue;

    const [storedValue, setStoredValue] = useState(currentValue);

    useEffect(() => {
        if (storedValue === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, storedValue);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
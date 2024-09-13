import React, { useEffect, useState } from "react";

const Typeahead = () => {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    
    const setInputValue = (e, suggestion) => {
        setInput(suggestion.title);
        setIsDropdownVisible(false);
    }

    useEffect(() => {
        if(input.length > 0) {
            const fetchSuggestions = async() => {
                try {
                    const response = await fetch("https://dummyjson.com/products");
                    const data = await response.json();
                    console.log(data);
                    const filteredProduct = data.products.filter((product) => product.title.toLowerCase().startsWith(input.toLowerCase()));
                    filteredProduct.sort((a, b) => a.title.localeCompare(b.title));
                    setSuggestions(filteredProduct);
                    setIsDropdownVisible(true);
                } catch(error) {
                    console.log("Error fetching suggessions: ", error);
                }
            }
            fetchSuggestions();
        } else {
            setSuggestions([]);
            setIsDropdownVisible(false);
        }
    }, [input]);

    return (
        <div className="typeahead">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to search..."
                onBlur={() => setIsDropdownVisible(false)}
                onFocus={() => input.length > 0 && setIsDropdownVisible(true)}
            />
            {isDropdownVisible && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={(e) => setInputValue(e, suggestion)}>
                            {suggestion.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Typeahead;
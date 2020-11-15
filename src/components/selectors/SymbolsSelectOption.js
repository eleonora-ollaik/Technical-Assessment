import React, {useState, useEffect} from 'react'

function SymbolsSelectOption(props) {
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {
        getSymbols()
    }, [])

    const getSymbols = async () => {
        const res = await fetch('/symbols');
        const data = await res.json();
        setSymbols(data)
        // console.log(symbols)
    }
    return (
            symbols.length === 0 ? (<option>No Symbols in the list</option>) : (
                symbols.map(symbol => <option onSelect={props.setCurrentSymbol} key={symbol.id}>{symbol.symbol}</option>)
                )
    )
}

export default SymbolsSelectOption
import React from "react";
import { createContext, useState } from "react";
const VariantContext = createContext(null);
const Context = (props) => {
    const [capacity, setCapacity] = useState([]);
    const [color, setColor] = useState([]);
    const [internal, setInternal] = useState([]);
    const [ram, setRam] = useState([]);
    const [size, setSize] = useState([]);
    const [page, setPage] = useState(1)
    const [price, setPrice] = useState(null);
    const [sort, setSort] = useState(null);
    const value = {
        color:{
            state:color,
            setState:setColor
        },
        capacity:{
            state:capacity,
            setState:setCapacity
        },
        internal:{
            state:internal,
            setState:setInternal
        },
        ram:{
            state:ram,
            setState:setRam
        },
        size:{
            state:size,
            setState:setSize
        },
        price:{
            state:price,
            setState:setPrice
        },
        sort:{
            state:sort,
            setState:setSort
        },
        page:{
            state:page,
            setState: setPage
        }
    };
    return (
        <VariantContext.Provider value={value}>
            {props.children}
        </VariantContext.Provider>
    );
};
export { VariantContext };
export default Context;

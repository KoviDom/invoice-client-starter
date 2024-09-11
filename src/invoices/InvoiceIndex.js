// src/invoices/InvoiceIndex.js

import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const initialFilterState = {
    buyerID: undefined,
    sellerID: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    product: undefined,
    limit: undefined,
}

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [filterState, setFilter] = useState(initialFilterState);
    const [persons, setPersons] = useState([]);

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);  // Maže fakturu na backendu
            setInvoices(invoices.filter((item) => item._id !== id));  // Aktualizuje stav
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    //fetchuji
    useEffect(() => {
        console.log("Aktuální filtry:", filterState);  // Přidáno pro kontrolu

        // Načítání faktur při prvním renderu nebo změně filtrů
        apiGet('/api/invoices')
            .then(data => setInvoices(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        apiGet("/api/persons")
            .then(data => setPersons(data));
    }, []);

    const handleChange = (e) => {
        // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: undefined }
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;

        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setFilter(initialFilterState);

        const data = await apiGet("/api/invoices");
        setInvoices(data);
    }

    return (
        <div>
            <h1>Seznam faktur</h1>
            <InvoiceFilter
                handleChange={handleChange}  // Funkce pro zpracování změn ve formuláři
                handleSubmit={handleSubmit}  // Funkce pro odeslání formuláře
                buyerList={persons}   // Seznam odběratelů
                sellerList={persons} // Seznam dodavatelů
                filter={filterState}
                handleReset={handleReset}
                setFilter={setFilter}         // Přímo používáme `filters` jako stav filtru
                confirm="Filtrovat faktury"  // Text na tlačítku pro odeslání
            />
            <hr />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;

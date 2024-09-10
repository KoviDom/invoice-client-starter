// src/invoices/InvoiceIndex.js

import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [filters, setFilters] = useState({
        buyerID: undefined,
        sellerID: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        product: undefined,
        limit: undefined,
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);  // Maže fakturu na backendu
            setInvoices(invoices.filter((item) => item._id !== id));  // Aktualizuje stav
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    useEffect(() => {
        console.log("Aktuální filtry:", filters);  // Přidáno pro kontrolu
        const queryString = new URLSearchParams(filters).toString();

        // Načítání faktur při prvním renderu nebo změně filtrů
        apiGet(`/api/invoices?${queryString}`)
            .then(data => setInvoices(data))
            .catch(error => console.error(error));
    }, [filters]);

    const handleFilterChange = (e) => {
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

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
    
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
      };

    return (
        <div>
            <h1>Seznam faktur</h1>
            <InvoiceFilter
                handleChange={handleFilterChange}  // Funkce pro zpracování změn ve formuláři
                handleSubmit={handleFilterSubmit}  // Funkce pro odeslání formuláře
                buyerList={buyerListState}   // Seznam odběratelů
                sellerList={sellerListState} // Seznam dodavatelů
                filter={filters}             // Přímo používáme `filters` jako stav filtru
                confirm="Filtrovat faktury"  // Text na tlačítku pro odeslání
            />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;

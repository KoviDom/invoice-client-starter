// src/invoices/InvoiceIndex.js

import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [filters, setFilters] = useState({
        buyer: "",
        seller: "",
        minPrice: "",
        maxPrice: "",
        product: "",
        limit: 10
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
        // Načítání faktur při prvním renderu nebo změně filtrů
        apiGet("/api/invoices", filters)
            .then(data => setInvoices(data))
            .catch(error => console.error(error));
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <h1>Seznam faktur</h1>
            <InvoiceFilter filters={filters} onFilterChange={handleFilterChange} />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;

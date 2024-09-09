// src/invoices/InvoiceForm.js

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        buyer: "",
        seller: "",
        date: "",
        product: "",
        price: "",
        note: "",
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? <div className="alert alert-danger">{errorState}</div> : null}
            {sentState && (
                <FlashMessage
                    theme={successState ? "success" : ""}
                    text={successState ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="3"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => setInvoice({...invoice, invoiceNumber: e.target.value })}
                />

                <InputSelect 
                    required={true}
                    type="select"
                    name="buyer"
                    min="3"
                    label="Odběratel"
                    prompt="Vyber odběratele"
                    items={["ITnetwork s.r.o.", "ictdemy s.r.o.", "Samuel Kodytek", "blablabla"]}
                    value={invoice.buyer}
                    handleChange={(e) => setInvoice({...invoice, buyer: e.target.value})}
                />

                <InputField
                    required={true}
                    type="date"
                    name="date"
                    label="Datum vystavení"
                    prompt="Zadejte datum"
                    min="0000-01-01"
                    value={invoice.date}
                    handleChange={(e) => setInvoice({...invoice, date: e.target.value })}
                />

                <InputSelect 
                    required={true}
                    type="select"
                    name="seller"
                    min="3"
                    label="Dodavatel"
                    prompt="Vyber dodavatel"
                    items={["ITnetwork s.r.o.", "ictdemy s.r.o.", "Samuel Kodytek", "blablabla"]}
                    value={invoice.seller}
                    handleChange={(e) => setInvoice({...invoice, seller: e.target.value})}
                />

                <InputField
                    required={true}
                    type="date"
                    name="date"
                    label="Datum splatnosti:"
                    prompt="Zadejte datum"
                    value={invoice.date}
                    handleChange={(e) => setInvoice({...invoice, date: e.target.value })}
                />

                <InputField 
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte produkt"
                    value={invoice.product}
                    handleChange={(e) => setInvoice({...invoice, product: e.target.value})}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    min="3"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => setInvoice({...invoice, price: e.target.value })}
                />

                <InputField
                    type="text"
                    name="note"
                    min="3"
                    label="Popis"
                    prompt="Zadejte popis"
                    value={invoice.note}
                    handleChange={(e) => setInvoice({...invoice, note: e.target.value })}
                />

                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>
        </div>
    );
};

export default InvoiceForm;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";

import FlashMessage from '../components/FlashMessage';
import InputField from '../components/InputField';
import InputSelect from '../components/InputSelect';

const InvoiceForm = () => {

    const {id} = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: {
            _id: 0
        },
        buyer: {
            _id: 0
        },
        issued: "",
        dueDate: "",
        product: "",
        price: 0,
        vat: 0,
        note: ""
    });
    const [persons, setPersons] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
        apiGet("/api/persons").then((data) => setPersons(data));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost(`/api/invoices`, invoice))
            .then((data) => {
                console.log('succcess', data)
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
                //mozna pak pridat neco pozdeji
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
        <div className="container">
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && success ? (
                <FlashMessage
                    theme={"success"}
                    text={"Uložení faktury proběhlo úspěšně."}
                />
            ) : null}
            <div>
                <form onSubmit={handleSubmit}>
                    <InputField
                        required={true}
                        type="text"
                        name="invoiceNumber"
                        min="3"
                        label="Číslo faktury"
                        prompt="Zadejte číslo faktury"
                        value={invoice.invoiceNumber}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, invoiceNumber: e.target.value });
                        }}
                    />

                    <InputSelect
                        name="buyer"
                        items={persons}
                        label="Odběratel"
                        prompt="Vyberte odběratele"
                        value={invoice.buyer._id}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, buyer: { _id: e.target.value } });
                        }}
                    />

                    <InputSelect
                        name="seller"
                        items={persons}
                        label="Dodavatel"
                        prompt="Vyberte dodavatele"
                        value={invoice.seller._id}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, seller: { _id: e.target.value } });
                        }}
                    />

                    <InputField
                        required={true}
                        type="date"
                        name="issued"
                        label="Datum vystavení"
                        prompt="Zadejte datum vystavení"
                        value={invoice.issued}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, issued: e.target.value });
                        }}
                    />

                    <InputField
                        required={true}
                        type="date"
                        name="dueDate"
                        label="Datum splatnosti"
                        prompt="Zadejte datum splatnosti"
                        value={invoice.dueDate}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, dueDate: e.target.value });
                        }}
                    />

                    <InputField
                        required={true}
                        type="text"
                        name="product"
                        label="Produkt"
                        prompt="Zadejte produkt"
                        value={invoice.product}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, product: e.target.value });
                        }}
                    />

                    <InputField
                        required={true}
                        type="number"
                        name="price"
                        label="Cena"
                        prompt="Zadejte cenu"
                        value={invoice.price}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, price: e.target.value });
                        }}
                    />

                    <InputField
                        required={true}
                        type="number"
                        name="vat"
                        label="dph"
                        prompt="Zadejte dph"
                        value={invoice.vat}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, vat: e.target.value });
                        }}
                    />

                    <InputField
                        required={true}
                        type="text"
                        name="note"
                        label="Popis"
                        prompt="Zadejte popis"
                        value={invoice.note}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, note: e.target.value });
                        }}
                    />

                    <br />
                    <input type="submit" className="btn btn-primary" value="Uložit" />
                </form>
            </div>
        </div>
    )
}

export default InvoiceForm;

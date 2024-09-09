/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";

const PersonDetail = () => {
    const {id} = useParams(); // id je identificationNumber (IČO)
    const [person, setPerson] = useState({});
    const [invoicesIssued, setInvoicesIssued] = useState([]);  // Vystavené faktury
    const [invoicesReceived, setInvoicesReceived] = useState([]);  // Přijaté faktury

    useEffect(() => {
        // TODO: Add HTTP req.
        // Načtení detailu osoby (pokud je k dispozici API pro získání osoby na základě IČO)
        apiGet("/api/persons/" + id).then((data) => setPerson(data));

        // Načtení vystavených faktur na základě IČO (sales)
        apiGet(`/api/identification/${id}/sales`).then((data) => {
            console.log("Vystavené faktury", data);
            setInvoicesIssued(data);
        });

        // Načtení přijatých faktur na základě IČO (purchases)
        apiGet(`/api/identification/${id}/purchases`).then((data) => {
            console.log("Přijaté faktury", data);
            setInvoicesReceived(data);
        });
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h1>Detail osoby</h1>
                <hr />
                <div className="d-flex flex-row">
                    <div>
                        <h3>{person.name} ({person.identificationNumber})</h3>
                        <p>
                            <strong>DIČ:</strong>
                            <br />
                            {person.taxNumber}
                        </p>
                        <p>
                            <strong>Bankovní účet:</strong>
                            <br />
                            {person.accountNumber}/{person.bankCode} ({person.iban})
                        </p>
                        <p>
                            <strong>Tel.:</strong>
                            <br />
                            {person.telephone}
                        </p>
                        <p>
                            <strong>Mail:</strong>
                            <br />
                            {person.mail}
                        </p>
                        <p>
                            <strong>Sídlo:</strong>
                            <br />
                            {person.street}, {person.city}, {person.zip}, {country}
                        </p>
                        <p>
                            <strong>Poznámka:</strong>
                            <br />
                            {person.note}
                        </p>
                    </div>
                        {/* Sekce faktur */}
                        <hr />
                    <div>
                        <h2>Vystavené faktury</h2>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Číslo faktury</th>
                                    <th>Odběratel</th>
                                    <th>Datum vystavení</th>
                                    <th>Datum splatnosti</th>
                                    <th>Částka</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoicesIssued.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td>{invoice.invoiceNumber}</td>
                                        <td>{invoice.seller?.name}</td>
                                        <td>{invoice.issued}</td>
                                        <td>{invoice.dueDate}</td>
                                        <td>{invoice.price} Kč</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2>Přijaté faktury</h2>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Číslo faktury</th>
                                    <th>Dodavatel</th>
                                    <th>Datum vystavení</th>
                                    <th>Datum splatnosti</th>
                                    <th>Částka</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoicesReceived.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td>{invoice.invoiceNumber}</td>
                                        <td>{invoice.buyer?.name}</td>
                                        <td>{invoice.issued}</td>
                                        <td>{invoice.dueDate}</td>
                                        <td>{invoice.price} Kč</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonDetail;

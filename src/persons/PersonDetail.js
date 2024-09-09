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
import {useParams, Link} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";

const PersonDetail = () => {
    const {id} = useParams(); // id je identificationNumber (IČO)
    const [person, setPerson] = useState({});
    const [invoicesIssued, setInvoicesIssued] = useState([]);  // Vystavené faktury
    const [invoicesReceived, setInvoicesReceived] = useState([]);  // Přijaté faktury
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Add HTTP req.
        // Načtení detailu osoby (pokud je k dispozici API pro získání osoby na základě IČO)
        apiGet("/api/persons/" + id)
            .then((data) => {
                setPerson(data);
                setInvoicesIssued(data.issuedInvoices || []);  // Odeslané faktury
                setInvoicesReceived(data.receivedInvoices || []);  // Přijaté faktury
                setLoading(false); // Načítání je hotovo
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false); // Načítání skončilo s chybou
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
      }

    if (error) {
        return <div className="alert alert-danger">Chyba: {error}</div>;
    }

    if (!person) {
        return <div>Žádná data k zobrazení.</div>;
    }

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
                        <Link to="/persons" className="btn btn-primary">Zpět</Link>
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
                                {invoicesIssued.length > 0 ? (
                                    invoicesIssued.map((invoice) => (
                                        <tr key={invoice.id}>
                                            <td><Link to={`/invoices/${invoice.id}`}>{invoice.invoiceNumber}</Link></td>
                                            <td>{invoice.buyer}</td>
                                            <td>{invoice.issued}</td>
                                            <td>{invoice.dueDate}</td>
                                            <td>{invoice.price} Kč</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">Žádné vystavené faktury</td>
                                    </tr>
                                )}
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
                                {invoicesReceived.length > 0 ? (
                                    invoicesReceived.map((invoice) => (
                                        <tr key={invoice.id}>
                                            <td><Link to={`/invoices/${invoice.id}`}>{invoice.invoiceNumber}</Link></td>
                                            <td>{invoice.seller}</td>
                                            <td>{invoice.issued}</td>
                                            <td>{invoice.dueDate}</td>
                                            <td>{invoice.price} Kč</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">Žádné přijaté faktury</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonDetail;

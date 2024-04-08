'use client';

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ButtonEdit } from "../buttons/ButtonEdit";



const TbodyA = ({ rows = [] }) => {
    const [row, setRows] = useState(rows)
    const castDateToCrDate = (date) => {
        const dateCast = new Date(date);
        const crDate = dateCast.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
        return crDate;
    }
    const castDateToInputDate = (date) => {
        const dateCast = new Date(date);
        const inputDate = dateCast.toLocaleDateString('en-CA', { timeZone: 'UTC' });
        return inputDate;
    }
    const [updateFormAgreement, setUpdateFormAgreement] = useState({});
    const searchParams = useSearchParams()
    const filter = searchParams.get("filter") || ""
    const text = searchParams.get("searchText") || ""

    return (
        <tbody>
            {
                row.filter((row) => (filter === "" || row.state === filter) && (text === "" || (row.topic.toLowerCase().includes(text.toLowerCase())
                    ||
                    row.description.toLowerCase().includes(text.toLowerCase())
                    ||
                    row.state.toLowerCase().includes(text.toLowerCase())
                    ||
                    `DSC-ACD-${row.agreementId.consecutive}-${row.agreementId.month}-${row.agreementId.year}`.toLowerCase().includes(text.toLowerCase())
                    ||
                    row.users.name.toLowerCase().includes(text.toLowerCase())
                    ||
                    castDateToCrDate(row.creationDate).toLowerCase().includes(text.toLowerCase())
                    ||
                    castDateToCrDate(row.deadline).toLowerCase().includes(text.toLowerCase())
                )))
                    .map((row, index) => {
                        const { id, topic, users, creationDate, asignedTo, deadline, sessionId, description, state, agreementId, agreementIdConsecutive } = row
                        const creationDateCast = castDateToCrDate(new Date(creationDate));
                        const deadlineCast = castDateToCrDate(new Date(deadline));
                        const deadlineInputCast = castDateToInputDate(new Date(deadline));

                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={`agree-${index}`}>
                                <td scope="row" className="px-6 py-4">
                                    {`DSC-ACD-${agreementId.consecutive}-${agreementId.month}-${agreementId.year}`}
                                </td>
                                <td className="px-6 py-4">
                                    {topic}
                                </td>
                                <td className="px-6 py-4">
                                    {users.name}
                                </td>
                                <td className="px-6 py-4">
                                    {creationDateCast}
                                </td>
                                <td className="px-6 py-4">
                                    {deadlineCast}
                                </td>
                                <td className="px-6 py-4">
                                    {state === "Vencido" ? (
                                        <span className="estado estado-rojo"></span>
                                    ) : state === "Cumplido" ? (
                                        <span className="estado estado-verde"></span>
                                    ) : state === "Por vencer" ? (
                                        <span className="estado estado-naranja"></span>
                                    ) : state === "Pendiente" ? (
                                        <span className="estado estado-amarillo"></span>
                                    ) : null}
                                    {state}
                                </td>
                                <td>
                                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded" title="Acuerdo">
                                        <img src="/document.png" alt="AcuerdoDoc" />
                                    </button>
                                    <ButtonEdit title="agreement" data={{ id, topic, asignedTo, creationDate, deadlineInputCast, sessionId, description, state, agreementId, agreementIdConsecutive }}  >
                                        <img src="/edit.png" alt="AcuerdoEdit" />
                                    </ButtonEdit>
                                </td>
                            </tr>
                        )
                    })}
        </tbody>

    )
}



export default TbodyA
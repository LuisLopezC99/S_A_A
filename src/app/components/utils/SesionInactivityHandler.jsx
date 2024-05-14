/**
 * Proyect: Sistema de acuerdos y actas municipales (SAA)
 * Company: Municipalidad de Tibás
 * Universidad Nacional de Costa Rica
 * School of Informatic
 * Information Systems Engineering
 * 
 * Date: 10/05/2024
 * Principal_Directory: src
 * Directory_1: app
 * Directory: components
 * File: utils
 * Archive: SesionInactivityHandler.jsx
 * 
 * Authors:
 * - Scrum: Luis Ignacio López Castro
 *   - email: luis.lopez.castro@est.una.ac.cr
 *   - ID: 402420889
 * - David Coto Solano
 *   - email: victor.coto.solano@est.una.ac.cr
 *   - ID: 305440064
 * - Andrés León Orozco
 *   - email: andres.leon.orozco@est.una.ac.cr
 *   - ID: 118920778
 * - Eduardo Aarón Ojeda Paladino
 *   - email: eduardo.ojeda.paladino@est.una.ac.cr
 *   - ID: 116500136
 * - Jennifer Quirós Chacón
 *   - email: jennifer.quiros.chacon@est.una.ac.cr
 *   - ID: 702790153
 * - José Miguel Sequeira Hernández
 *   - email: jose.sequeira.hernandez@est.una.ac.cr
 *   - ID: 116590034
 */

"use client"
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Swal from 'sweetalert2'; 

const MAX_INACTIVITY_TIME = +(process.env.NEXT_PUBLIC_TIME_OUT_MS || 1800000); // Tiempo de inactividad predeterminado: 10 minutos
const INACTIVITY_CHECK_INTERVAL = +(process.env.NEXT_PUBLIC_TIME_OUT_CHECK_MS || 10000); // Intervalo de verificación predeterminado: 10 segundos

const AutoLogoutProvider = ({ timeoutMs = MAX_INACTIVITY_TIME, timeoutCheckMs = INACTIVITY_CHECK_INTERVAL, debug = false, requireSession = false, children }) => {
    const [lastActivity, setLastActivity] = useState(new Date().getTime());
    const { data: session, status } = useSession({ required: requireSession });
    const _storageKey = "_lastActivity";

    function storage() {

        return typeof window !== 'undefined' ? window.localStorage : null;
    }

    const parseLastActivityString = (activityStr) => {
        if (!activityStr) return null;

        const lastActivity = +activityStr;

        const now = activity();

        if (lastActivity == null ||
            lastActivity > now ||
            lastActivity <= 0 ||
            isNaN(lastActivity)) {
            return null;
        }

        return lastActivity;
    };

    const initLastActivity = () => {
        const now = activity();

        const lastActivityStr = storage()?.getItem(_storageKey);

        const lastActivity = parseLastActivityString(lastActivityStr);

        return lastActivity == null ? now : lastActivity;
    };

    useEffect(() => {
        if (!lastActivity)
            setLastActivity(initLastActivity());
    }, [lastActivity]);

    function activity() {
        return new Date().getTime();
    }

    const onUserActivity = () => {
        const now = activity();

        if (debug){}
        storage()?.setItem(_storageKey, now.toString());
        setLastActivity(now);
    };

    const onStorage = ({ key, storageArea, newValue }) => {
        if (key === _storageKey && storageArea === storage()) {
            if (debug){

            }                
            const lastActivity = parseLastActivityString(newValue);

            if (lastActivity !== null) {
                setLastActivity(lastActivity);
            }
        }
    };

    const isUserInactive = () => {
        const now = activity();
        if (status === 'authenticated') {
            const expiry = new Date(session?.expires).getTime();

            if (now > expiry) {
                if (debug) {
                    console.error('User has expired======', expiry, now);
                }
                signOut({ redirect: true })
                setLastActivity(now);

                return true;
            }
        }

        if (lastActivity + timeoutMs < now) {
            if (debug)
            signOut({ redirect: true })
            setLastActivity(now);
            return true;
        }

        return false;
    };

    const onTimerElapsed = () => {
        isUserInactive();
    };

    useEffect(() => {
        if (status === "loading") {
            return;
        }

        if (status === "unauthenticated") {
            return;
        }

        if (timeoutMs === null) {
            return;
        }

        if (isUserInactive()) {
            return;
        }

        const windowEvents = [
            'focus',
            'scroll',
            'click',
            'mousemove'
        ];

        windowEvents.forEach(eventName => {
            window.addEventListener(eventName, onUserActivity, false);
        });

        window.addEventListener("storage", onStorage, false);

        const intervalId = window.setInterval(onTimerElapsed, timeoutCheckMs);

        return () => {
            windowEvents.forEach(eventName => {
                window.removeEventListener(eventName, onUserActivity, false);
            });

            window.removeEventListener("storage", onStorage, false);

            window.clearInterval(intervalId);
        }
    }, [isUserInactive, lastActivity, onStorage, onTimerElapsed, status, timeoutCheckMs, timeoutMs]);

    return <>{children}</>;
};

export default AutoLogoutProvider;
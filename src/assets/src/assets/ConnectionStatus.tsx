import { useEffect, useRef, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CONNECTION_STATUS } from './Mutations';
import { getStatus, StatusType } from './StatusUtils';

const PING_INTERVAL = 5000;
const PING_URL = '/ping';

const ConnectionStatus: React.FC = () => {
    const rttRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [updateConnectionStatus] = useMutation<{ updateConnectionStatus: boolean }, { rtt: number }>(UPDATE_CONNECTION_STATUS);

    const checkConnection = useCallback(async () => {
        const startTime = performance.now();
        try {
            const response = await fetch(PING_URL, { signal: AbortSignal.timeout(PING_INTERVAL) });
            const endTime = performance.now();

            if (response.ok) {
                const rtt = Math.round(endTime - startTime);
                rttRef.current = rtt;

                await updateConnectionStatus({ variables: { rtt } });

                const status: StatusType = getStatus(rtt);
                console.log(`Connection Status: ${status}`);
            } else {
                console.warn('Ping failed');
            }
        } catch (error) {
            console.warn('Ping request failed:', error);
        } finally {
            timeoutRef.current = setTimeout(checkConnection, PING_INTERVAL);
        }
    }, [updateConnectionStatus]);

    useEffect(() => {
        checkConnection();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [checkConnection]);

    return null;
};

export default ConnectionStatus;

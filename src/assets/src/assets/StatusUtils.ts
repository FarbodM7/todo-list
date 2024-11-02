export type StatusType = 'good' | 'fair' | 'poor' | 'critical';

export function getStatus(rtt: number): StatusType {
    const statusLevels = {
        good: 100,
        fair: 300,
        poor: 600,
        critical: Infinity,
    };

    if (rtt <= statusLevels.good) return 'good';
    if (rtt <= statusLevels.fair) return 'fair';
    if (rtt <= statusLevels.poor) return 'poor';
    return 'critical';
}

export default getStatus;

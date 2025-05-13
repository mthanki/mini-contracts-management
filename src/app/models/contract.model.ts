export interface Contract {
    id: number;
    title: string;
    party: string;
    status: 'Active' | 'Expired' | 'Pending';
    startDate: string;
    endDate: string;
    amount: number;
    [key: string]: any;
}

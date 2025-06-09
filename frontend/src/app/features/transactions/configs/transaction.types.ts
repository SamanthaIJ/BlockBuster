export interface Transaction {
    id: number;
    timestamp: Date | string;
    amount: number;
    currencyCode: string;
    currencyRate?: number;
    description: string;
    otherParty?: {
        name: string;
        iban: string;
    };
}

export interface Day {
    id: string;
    transactions: Transaction[];
}

export interface TransactionsData {
    days: Day[];
}
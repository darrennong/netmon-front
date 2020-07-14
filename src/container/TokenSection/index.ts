export interface Token {
    contact: string;
    createdAccounts: Array<string>;
    date: Date;
    maxSupply: number;
    name: string;
    numHolders: number;
    supply: number;
    symbol: string;
    price: number;
}
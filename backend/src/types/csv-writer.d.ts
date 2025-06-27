// src/types/csv-writer.d.ts
declare module 'csv-writer' {
    export function createObjectCsvStringifier(opts: any): {
        getHeaderString(): string;
        stringifyRecords(records: any[]): string;
    };
}

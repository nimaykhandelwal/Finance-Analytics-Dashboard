// src/utils/csvExporter.ts
import { createObjectCsvStringifier } from 'csv-writer';
import { ITransaction } from '../models/Transaction';

export const exportToCsv = async (
    data: ITransaction[],
    cols: string[]
): Promise<Buffer> => {
    // build the header
    const header = cols.map(c => ({ id: c, title: c }));
    const csvStringifier = createObjectCsvStringifier({ header });

    // map each record to an object keyed by column name
    const records = data.map(item =>
        cols.reduce((row, col) => ({ ...row, [col]: (item as any)[col] }), {})
    );

    // concatenate header + records
    const csv =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(records);

    return Buffer.from(csv);
};

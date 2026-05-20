import { Parser } from "json2csv";

export const exportLeadsToCSV = (leads: any[]) => {

  const fields = [
    "name",
    "email",
    "status",
    "source",
    "createdAt"
  ];

  const json2csv = new Parser({ fields });

  return json2csv.parse(leads);
};
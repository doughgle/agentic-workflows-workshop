// Custom markdownlint-cli2 rule to catch blank lines inside tables
// so rendered GitHub tables keep all rows contiguous.
import { addError } from "markdownlint-rule-helpers";

const noBlankLinesInTables = {
  names: ["AW0001", "no-blank-lines-in-tables"],
  description: "Disallow blank lines inside Markdown tables",
  tags: ["tables", "formatting"],
  function: (params, onError) => {
    const { lines } = params;
    let inTable = false;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const isTableRow = /^\s*\|/.test(line);

      if (isTableRow) {
        inTable = true;
        continue;
      }

      if (inTable) {
        if (line.trim() === "") {
          addError(
            onError,
            i + 1,
            "Blank line inside table breaks GitHub rendering; remove blank lines between header/separator and rows."
          );
        }
        // Exit table context on any non-table line (blank or not)
        inTable = false;
      }
    }
  }
};

export const rules = [noBlankLinesInTables];

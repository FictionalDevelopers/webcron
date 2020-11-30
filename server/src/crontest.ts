import { writeFileSync } from 'fs';
import { resolve } from 'path';

const [, , id, url] = process.argv;

writeFileSync(
  resolve(__dirname, `cronresult-${id}`),
  `
    url: ${url}
    ${__dirname} - ${resolve(__dirname)}
    ${__filename} - ${resolve(__filename)}
    ----
`,
);

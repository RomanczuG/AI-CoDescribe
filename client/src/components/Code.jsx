import {refractor} from "refractor";
import {toHtml} from 'hast-util-to-html'
import React from "react";

const explanationCode = `#Example Code
void calc_mean_variance(double* data, int n, double* mean, double* variance) {
    *mean = 0;
    *variance = 0;
    for (int i = 0; i < n; i++) {
        *mean += data[i];
    }
    *mean /= n;
    for (int i = 0; i < n; i++) {
        *variance += (data[i] - *mean) * (data[i] - *mean);
    }
    *variance /= n;
    }`;

const tree = refractor.highlight(explanationCode, 'js')
// const html = toHtml(tree).replace(/<([a-z]+)/, '<$1 class="my-class"');
// const Code = () => {
    
//     return React.createElement("pre", { dangerouslySetInnerHTML: { __html: html } });
// }

// export default Code;
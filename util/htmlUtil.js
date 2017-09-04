let createCssTag = (url) => {
    return `<link rel="stylesheet" type="text/css" href="${url}"/>`;
};

let createCssTags = (urls) => {
    let tags = '';
    for (let id in urls) {
        let url = urls[id];
        tags += createCssTag(url);
    }
    return tags;
};

let createJsTag = (url) => {
    return `<script src="${url}"></script>`;
};

let createJsTags = (urls) => {
    let tags = '';
    for (let id in urls) {
        let url = urls[id];
        tags += createJsTag(url);
    }
    return tags;
};

let createHtmlData = (html, css, js) => {
    // return `${css} <style>div.headline{display:none;}</style> ${html} ${js}`
    return `${css} ${html} ${js}`
};

module.exports = {
    createCssTags: createCssTags,
    createJsTags: createJsTags,
    createHtmlData: createHtmlData
}

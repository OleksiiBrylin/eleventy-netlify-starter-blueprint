/*
* Use this file to declare Eleventy Filters for useing Filters in CMS Live Preview
*/

const { DateTime } = require("luxon");

function readableDateFilter(dateObj) {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
}

const MarkdownIt = require("markdown-it");

const markdown = new MarkdownIt({
  html: true,
});

function markdownFilter(value) {
    if (!value) {
        value = '';
    }
    return markdown.render(value);
};

// Cut array, collection or string - {{ collections.news | limitTo(10) }}
function limitToFilter (input, limit) {
    if(typeof limit !== 'number'){
        return input;
    }
    if(typeof input === 'string'){
        if(limit >= 0){
            return input.substring(0, limit);
        } else {
            return input.substr(limit);
        }
    }
    if(Array.isArray(input)){
        limit = Math.min(limit, input.length);
        if(limit >= 0){
            return input.splice(0, limit);
        } else {
            return input.splice(input.length + limit, input.length);
        }
    }

    return input;
};

// The filter helps to catch errors in CMS Live Preview if html is invalid
function tidyHTMLFilter(html) {
    if (!html) {
        return '';
    }

    if (typeof DOMParser === 'undefined') {
        return html;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/xml');
    if (doc.documentElement.querySelector('parsererror')) {
        return doc.documentElement.querySelector('parsererror').innerText;
    } else {
        return html;
    }
}

// The filter prepares resized images if you use cloudinary
function cloudinaryFilter(src, width, height = '') {
    const cloudName = '';
    const domainName = 'https://example.com';

    if (!cloudName) {
        return `${src}?width=${width}&height=${height}`;
    }

    let imgPath = src;

    if (!imgPath) {
        return '';
    }

    let transformation = `f_auto,w_${width}`;
    if (height) {
        transformation += ',c_fill,h_' + height;
    }

    const isLocalImage = imgPath.startsWith('/');
    if (isLocalImage) {
        imgPath = domainName + imgPath;
        return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformation}/${imgPath}`;
    }
    
    const regex = /\/(v[^\/]*)\//i;
    return imgPath.replace(regex, '/' + transformation + '/');
}

function langFilter(collection, lang = 'en') {
    return collection.filter(item => item.data.lang == lang)
}

// Use it if you need to prevent errors in CMS Live Preview
function dummyFilter(string) {
    return string;
}

module.exports = {
    readableDateFilter,
    markdownFilter,
    limitToFilter,
    tidyHTMLFilter,
    cloudinaryFilter,
    langFilter,
    dummyFilter,
};
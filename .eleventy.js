const yaml = require("js-yaml");
const htmlmin = require("html-minifier");
const eleventySass = require("eleventy-sass");
const MarkdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-table-of-contents");
const postcss = require("postcss");
const atImport = require("postcss-import");
const postCssMinify = require("postcss-minify");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/i18n');

const helpers = require('./eleventy-helpers');

module.exports = function (eleventyConfig) {
  // ADD DELAY BEFORE RE-RUNNING
  eleventyConfig.setWatchThrottleWaitTime(1000);

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "en",
    errorMode: "never", //"allow-fallback",
  });

  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en'
    }
  });

  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", helpers.readableDateFilter);

  eleventyConfig.addFilter("limitTo", helpers.limitToFilter);
  eleventyConfig.addFilter("tidyHTML", helpers.tidyHTMLFilter);
  eleventyConfig.addFilter("cloudinaryFilter", helpers.cloudinaryFilter);
  eleventyConfig.addFilter("langFilter", helpers.langFilter);

  const markdown = new MarkdownIt({
    html: true,
  });

  eleventyConfig.setLibrary("md", markdown);
  eleventyConfig.addFilter("markdown", helpers.markdownFilter);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
  });

  // Prepare Admin Live Preview templates 
  eleventyConfig.addPassthroughCopy({
    "./src/admin/preview-templates/": "./admin/templates/",
    "./src/_includes/": "./admin/templates/",
  });

  // scss
  eleventyConfig.addPlugin(eleventySass, {
    postcss: postcss([atImport, postCssMinify])
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  eleventyConfig.addPassthroughCopy("./src/static/js");
  eleventyConfig.addPassthroughCopy("./src/static/fonts");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/static/img/favicon.ico");

  eleventyConfig.addPassthroughCopy("./src/robots.txt");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addFilter("jsbundle", (code) => {
    require('fs').writeFileSync('in.js', code)
    require('esbuild').buildSync({
      entryPoints: ['in.js'],
      outfile: 'out.js',
      minify: true,
      bundle: true,
    })
    const bundle = require('fs').readFileSync('out.js', 'utf8')
    return bundle
  })

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};

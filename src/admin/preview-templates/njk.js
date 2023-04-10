import nunjucks from 'nunjucks';
const njk = nunjucks.configure('templates', {
  autoescape: true,
  throwOnUndefined: false,
});

const helpers = require('./../../../eleventy-helpers');

njk.addFilter("readableDate", helpers.readableDateFilter);
njk.addFilter("limitTo", helpers.limitToFilter);
njk.addFilter("markdown", helpers.markdownFilter);
njk.addFilter("tidyHTML", helpers.tidyHTMLFilter);
njk.addFilter("cloudinaryFilter", helpers.cloudinaryFilter);
njk.addFilter("langFilter", helpers.langFilter);
njk.addFilter("i18n", helpers.dummyFilter);
njk.addFilter("locale_url", helpers.dummyFilter);

njk.addGlobal('settings', { en: { footer_copyright: 'Lorem Ipsum is simply dummy text of the printing © - 2023'} });
njk.addGlobal('navigation', { en: { footer_items: [{ text: 'Home', url: '/'}], items: [{ text: 'Home', url: '/'}] }});
njk.addGlobal('locale', 'en');
njk.addGlobal('page', { url: '/' });
njk.addGlobal('collections', {
  news: [{
    data: {
      title: 'Title 1',
      subtitle: 'This is my first post',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    },
    date: '2012-05-05T11:25:02.444Z',
    url: '/'
  },
  {
    data: {
      title: 'Why do we use it?',
      subtitle: 'It is a long established fact...',
      description: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    },
    date: '2012-05-05T11:25:02.444Z',
    url: '/'
  }],
});


export default njk;
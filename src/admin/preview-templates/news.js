import njk from './njk.js';
import parse from 'html-react-parser';

const News = createClass({
  render() {
    const entry = this.props.entry;

    const htmlString = njk.render('cms-admin.html', {
      sections: [{type: 'text', text: entry.getIn(["data", "body"]), top_margin: true}]
    });

    return parse(htmlString);
  }
});

export default News;
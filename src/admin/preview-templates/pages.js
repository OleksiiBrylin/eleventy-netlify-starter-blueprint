import njk from './njk.js';
import parse from 'html-react-parser';

const Pages = createClass({
  render() {
    const entry = this.props.entry;

    const sections = entry.getIn(["data", "sections"])?.toJS();
    const banner = entry.getIn(["data", "banner"])?.toJS();

    const htmlString = njk.render('cms-admin.html', {
      sections,
      banner,
    });

    return parse(htmlString);
  }
});

export default Pages;
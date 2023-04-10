import njk from './njk.js';
import parse from 'html-react-parser';

const Navigation = createClass({
  render() {
    const entry = this.props.entry;

    // @todo get language to prepare data
    const footer_items = entry.getIn(["data", "footer_items"])?.toJS();
    const items = entry.getIn(["data", "items"])?.toJS();

    const htmlString = njk.render('cms-admin.html', {
      navigation: { footer_items, items }
    });

    return parse(htmlString);
  }
});

export default Navigation;
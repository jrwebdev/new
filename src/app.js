import React from 'react';
import ReactDOM from 'react-dom';

import {
  addLocaleData,
  IntlProvider,
  FormattedMessage,
  FormattedDate
} from 'react-intl';

const localeData = {
  en: () => Promise.all([System.import('react-intl/locale-data/en'), System.import('./lang/en.json')]),
  de: () => Promise.all([System.import('react-intl/locale-data/de'), System.import('./lang/de.json')]),
  fr: () => Promise.all([System.import('react-intl/locale-data/fr'), System.import('./lang/fr.json')]),
  es: () => Promise.all([System.import('react-intl/locale-data/es'), System.import('./lang/es.json')]),
};

class Main extends React.Component {

  state = {
    locale: 'en'
  }

  componentWillMount() {
    this.setLocale(this.state.locale);
  }

  setLocale(locale) {
    this.setState({loadingLocale: locale});
    // TODO: Error handling
    localeData[locale]().then(([data, messages]) => {
      addLocaleData(data);
      this.setState({locale, messages, loadingLocale: ''});
    });
  }

  changeLocale = ({target}) => {
    this.setLocale(target.value);
  }

  render() {
    if (!this.state.messages) { return <div>Loading...</div>; }

    const {locale, messages, loadingLocale} = this.state;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div>
          <select
            value={loadingLocale || locale}
            onChange={this.changeLocale}
            disabled={loadingLocale}
            style={{marginRight: 10}}
          >

            <option value="en">English</option>
            <option value="de">Deutsche</option>
            <option value="fr">français</option>
            <option value="es">Español</option>

          </select>
          {loadingLocale ? 'Loading...' : ''}
          <div style={{marginTop: 25, fontSize: 48}}>
            <FormattedMessage
              id="hello"
              defaultMessage={'Hello {name}!'}
              values={{name: 'James'}}
            />
          </div>
          <div>
            <FormattedDate
              value={new Date()}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            />
          </div>
        </div>
      </IntlProvider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';

import {
  addLocaleData,
  IntlProvider,
  FormattedMessage,
  FormattedDate
} from 'react-intl';

import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';

import Test from './components/test';

addLocaleData([...en, ...de, ...fr, ...es]);

const messages = {
  en: {
    hello: 'Hello {name}!'
  },
  de: {
    hello: 'Hallo {name}!'
  },
  fr: {
    hello: 'Bonjour {name}!'
  },
  es: {
    hello: '¡Hola {name}!'
  }
};

class Main extends React.Component {

  state = {
    locale: 'en'
  }

  changeLocale = ({target}) => {
    this.setState({locale: target.value});
  }

  render() {
    const localisedMessages = messages[this.state.locale];
    return (
      <IntlProvider locale={this.state.locale} messages={localisedMessages}>
        <div>
          <select value={this.state.locale} onChange={this.changeLocale}>
            <option value="en">English</option>
            <option value="de">Deutsche</option>
            <option value="fr">français</option>
            <option value="es">Español</option>
          </select>
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
          <div>
            <Test />
          </div>
        </div>
      </IntlProvider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));

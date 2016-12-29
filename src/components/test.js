import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';

const Test = () => (
  <FormattedHTMLMessage
    id="testMessage"
    defaultMessage="This is a <b>test</b> message"
    description="Test message using HTML"
  />
);

export default Test;

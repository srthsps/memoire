
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react'


ReactDOM.render(
<Auth0Provider
  domain="srthsps-dev.us.auth0.com"
  clientId="iefj6hhaUjvE82FJwobVa6AqznfY8A8K"
  redirectUri={window.location.origin}
  >
  
<App />

</Auth0Provider>
,
  document.getElementById('root')
)
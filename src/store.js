import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import registrationReducer from './reducers/registration';
import clientReducer from './reducers/client';
import apicodeReducer from './reducers/apicode';
import campaignReducer from './reducers/campaign';
import packageReducer from './reducers/package';
import directoryReducer from './reducers/directory';
import directoryContactReducer from './reducers/directory.contact';
import contactReducer from './reducers/contact';
import templateReducer from './reducers/template';
import dashboardReducer from './reducers/dashboard';
import accountReducer from './reducers/account';
import deviceReducer from './reducers/device';

import loginFormReducer from './reducers/form.login';
import campaignFormReducer from './reducers/form.campaign';
import directoryFormReducer from './reducers/form.directory';
import contactFormReducer from './reducers/form.contact';
import templateFormReducer from './reducers/form.template';
import accountFormReducer from './reducers/form.account';

const appReducer = combineReducers({
  authReducer: authReducer,
  loginFormReducer: loginFormReducer,
  registrationReducer: registrationReducer,
  clientReducer: clientReducer,
  apicodeReducer: apicodeReducer,
  campaignReducer: campaignReducer,
  packageReducer: packageReducer,
  directoryReducer: directoryReducer,
  directoryContactReducer: directoryContactReducer,
  templateReducer: templateReducer,
  contactReducer: contactReducer,
  dashboardReducer: dashboardReducer,
  campaignFormReducer: campaignFormReducer,
  directoryFormReducer: directoryFormReducer,
  contactFormReducer: contactFormReducer,
  templateFormReducer: templateFormReducer,
  accountReducer: accountReducer,
  accountFormReducer: accountFormReducer,
  deviceReducer: deviceReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    console.log('logged out');
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

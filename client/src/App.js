import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLnk = setContext((_, { headers }) => {
  // get the auth token from local storage if it exists
  const tkn = localStorage.getItem('id_token');
  // return the headers to the context   
  return {
    headers: {
      ...headers,
      authorization: tkn ? `Bearer ${tkn}` : '',
    },
  };
});

const appClient = new ApolloClient({
  // Set up our client to execute the `authLnk` middleware prior to making the request to our GraphQL API
  link: authLnk.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (

    
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;

"use client"; 

import { ApolloProvider } from '@apollo/client';
import client from './lib/ApolloClient'; 
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import NavBar from './NavBar';
import { useState } from 'react';

export default function Layout({ children }) {
 

  return (
    <html lang="en">
      <head>
        <title>Book Data</title> 
      </head>
      <body>
        <ApolloProvider client={client}>
          <NavBar  /> 
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}

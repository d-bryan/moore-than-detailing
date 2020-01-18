import React from 'react';
import { Route } from 'react-router';

export default (

  <Route >
    {/* <Route path="/" /> */}
    <Route path="/admin-login" />
    <Route path="/admin-logout" />
    <Route path="/gallery">
      <Route path="coupe" />
      <Route path="four-door" />
      <Route path="suv" />
      <Route path="large" />
    </Route>
    <Route path="/services" />
    <Route path="/about-us" />
    <Route path="/login-required" />
    <Route path="/forbidden" />
    <Route path="/error" />
    <Route path="/not-found" />
  </Route>
);
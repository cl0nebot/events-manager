import React, { Component } from "react";
import "../styles/styles.scss";
import LandingPage from "../components/LandingPage.jsx";
import SignUpForm from "../components/SignUpForm.jsx";
import { connect } from "react-redux";

export class App extends Component {
  render() {
    return <LandingPage />;
  }
}

export default connect(state => state)(App);

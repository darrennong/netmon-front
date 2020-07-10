import { PureComponent } from "react";
import { I18nextProvider } from 'react-i18next';
import React from "react";
import i18n from "./i18n";
import { AsyncHomePage } from "../homepage/loadable";

export default class App extends PureComponent {
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <AsyncHomePage />
      </I18nextProvider>
    );
  }
}
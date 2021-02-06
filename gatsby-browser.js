import React from "react";
import Layout from "./src/components/layout";

import "./src/styles/global.css";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  );

  if (answer === true) {
    window.location.reload();
  }

};

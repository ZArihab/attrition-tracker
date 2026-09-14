import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider locale="en" messages={[messages]}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </I18nProvider>
);

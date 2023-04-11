import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

// import "../node_modules/bulma/css/bulma-rtl.min.css";

import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./components/pages/Home";
import { SignUp } from "./components/pages/SignUp";
import { LogIn } from "./components/pages/LogIn";
import { Dashboard } from "./components/dashboard/Dashboard";
import { MyAccount } from "./components/dashboard/MyAccount";
import { Provider } from "react-redux";
import { store } from "./store";
import { ProtectedRoutes } from "./components/layout/ProtectedRoutes";
import { Leads } from "./components/dashboard/Leads";
import { LeadAdd } from "./components/dashboard/LeadAdd";
import { Lead } from "./components/dashboard/Lead";
import { LeadEdit } from "./components/dashboard/LeadEdit";
import { Team } from "./components/dashboard/Team";
import { TeamAdd } from "./components/dashboard/TeamAdd";
import { TeamMemberAdd } from "./components/dashboard/TeamMemberAdd";
import { Clients } from "./components/dashboard/Clients";
import { ClientAdd } from "./components/dashboard/ClientAdd";
import { Client } from "./components/dashboard/Client";
import { ClientEdit } from "./components/dashboard/ClientEdit";
import { NoteAdd } from "./components/dashboard/NoteAdd";
import { NoteEdit } from "./components/dashboard/NoteEdit";
import { MemberEdit } from "./components/dashboard/MemberEdit";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />,
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/my-account" element={<MyAccount />} />
          <Route path="/dashboard/team" element={<Team />} />
          <Route path="/dashboard/team/add" element={<TeamAdd />} />
          <Route path="/dashboard/team/member/add" element={<TeamMemberAdd />} />
          <Route path="/dashboard/team/member/edit/:member_id" element={<MemberEdit />} />
          <Route path="/dashboard/leads" element={<Leads />} />
          <Route path="/dashboard/leads/add" element={<LeadAdd />} />
          <Route path="/dashboard/leads/edit/:id" element={<LeadEdit />} />
          <Route path="/dashboard/leads/:id" element={<Lead />} />
          <Route path="/dashboard/clients" element={<Clients />} />
          <Route path="/dashboard/clients/add" element={<ClientAdd />} />
          <Route path="/dashboard/clients/edit/:id" element={<ClientEdit/>} />
          <Route path="/dashboard/clients/:id" element={<Client/>} />
          <Route path="/dashboard/clients/note/add/:id" element={<NoteAdd/>} />
          <Route path="/dashboard/clients/:client_id/note/edit/:note_id" element={<NoteEdit/>} />
        </Route>
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

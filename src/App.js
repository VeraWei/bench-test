import React from "react";
import { Header }from "./features/header";
import { Transactions } from "./features/transactions";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header title="Bench Test" />
            <div className="container">
                <Transactions />
            </div>
        </div>
    );
}

export default App;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CustomerTbl from "./Customer/CustomerTbl";
import "../css/index.css";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
        };
    }

    onAddCustomerClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const { first_name, last_name, email, phone } = this.state;
        axios
            .post("/api/add-customer", {
                first_name,
                last_name,
                email,
                phone,
            })
            .then((res) => {
                if (res.status == 200) {
                    this.setState({
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                    });
                    this.child.fetchCustomers();
                    console.log("Successfully created.");
                } else {
                    console.log("Unsuccessful: ", res.data.message);
                }
            })
            .catch(function (err) {
                console.log("error:", err);
            });
    }

    render() {
        const { first_name, last_name, email, phone } = this.state;
        return (
            <div className="container form-container">
                <div className="add-cust-wrap">
                    <div className="section-title">React JS</div>
                    <form>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    value={first_name}
                                    className="form-control"
                                    placeholder="First Name"
                                    onChange={(event) =>
                                        this.setState({
                                            first_name: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="last_name"
                                    value={last_name}
                                    className="form-control"
                                    placeholder="Last Name"
                                    onChange={(event) =>
                                        this.setState({
                                            last_name: event.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={(event) =>
                                        this.setState({
                                            email: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="tel"
                                    value={phone}
                                    className="form-control"
                                    placeholder="Telephone"
                                    onChange={(event) =>
                                        this.setState({
                                            phone: event.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                    onClick={(event) => {
                                        this.onAddCustomerClick(event);
                                    }}
                                >
                                    Add Customer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <CustomerTbl
                        ref={(instance) => {
                            this.child = instance;
                        }}
                    ></CustomerTbl>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));

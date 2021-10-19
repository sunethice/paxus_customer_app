import React, { Component } from "react";
// import { connect } from "react-redux";
// import "../../../css/AdminTransfer.css";
// import PackageActions from "./PackageActions";
// import { addPackage } from "../../actions/PackageAction";
// import { destbyname, destbyindex, destindex } from "../../enums/destinations";
// import API from "../../utils/API";

class CustomerRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            withAction: 1, //0: Create, 1: Edit
        };
    }

    OnEditClick() {
        const { withAction } = this.state;
        this.props.sliderfunc(
            PackageActions,
            this.props.packageItem,
            withAction,
            true
        );
    }

    OnDeleteClick() {
        const { withAction } = this.state;
    }

    render() {
        return (
            <tr>
                <td>{this.props.customerItem.id}</td>
                <td>{this.props.customerItem.first_name}</td>
                <td>{this.props.customerItem.last_name}</td>
                <td>{this.props.customerItem.email}</td>
                <td>{this.props.customerItem.phone}</td>
                <td>{this.props.customerItem.created_at}</td>
                <td>{this.props.customerItem.updated_at}</td>
                <td>
                    <button
                        className="btn btn-info"
                        onClick={() => {
                            this.setState({
                                withAction: 1,
                            });
                            this.OnEditClick();
                        }}
                    >
                        Edit
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.OnDeleteClick()}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default CustomerRow;

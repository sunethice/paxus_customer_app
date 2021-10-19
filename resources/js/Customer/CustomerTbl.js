import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { connect } from "react-redux";
// import "../../../css/AdminTransfer.css";
// import PackageActions from "./PackageActions";
import CustomerRow from "./CustomerRow";
// import { listPackages } from "../../actions/PackageAction";

class CustomerTbl extends Component {
    componentDidMount() {
        try {
            this.fetchCustomers();
        } catch (error) {
            console.log(`Axios request failed: ${error}`);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            withAction: 0, //0: Create, 1: Edit
            data: null,
            custArr: [],
        };
    }

    fetchCustomers() {
        axios
            .get("/api/list-customers")
            .then((res) => {
                console.log("res", res);
                if (res.status == 200) {
                    this.setState({
                        custArr: res.data.pResultObj,
                    });
                    console.log("Successfully listed.");
                } else {
                    console.log("Unsuccessful: ", res.data.message);
                }
            })
            .catch(function (err) {
                console.log("error:", err);
            });
    }

    render() {
        const { custArr } = this.state;
        console.log("custArr", custArr);
        return (
            <>
                <div>
                    <div id="package_wrap" className="table-responsive">
                        <table className="table table-sm">
                            <thead>
                                <tr className="table-secondary">
                                    <td>Customer ID</td>
                                    <td>First Name</td>
                                    <td>Last Name</td>
                                    <td>Email</td>
                                    <td>Phone Number</td>
                                    <td>Created On</td>
                                    <td>Updated On</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                {custArr && custArr.length != 0 ? (
                                    custArr.map((item) => (
                                        <CustomerRow
                                            key={item.id}
                                            customerItem={item}
                                            // sliderfunc={this.props.sliderfunc}
                                        ></CustomerRow>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan="9">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}
export default CustomerTbl;

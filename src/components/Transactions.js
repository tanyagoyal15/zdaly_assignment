import React, { Component } from 'react'

export class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions : []
        }
    }

    componentDidMount() {
        fetch("/bankAccount")
            .then(res => {
                return res.json();
            })
            .then(res => this.setState({ transactions: res }))
    }

    render() {
        const transactions = this.state.transactions.map((transaction , idx) => {
            return <ul className="transactions">
                <li key={idx}>{++idx}</li>
                <li key={idx}>{transaction["Date"]}</li>
                <li key={idx}>{transaction["Transaction Details"]}</li>
                <li key={idx}>{transaction["Value Date"]}</li>
                <li key={idx}>{transaction["Withdrawal AMT"]}</li>
                <li key={idx}>{transaction["Deposit AMT"]}</li>
                <li key={idx}>{transaction["Balance AMT"]}</li>
            </ul>
        })
        return (
            <div className="transactions-container">
                <ul className="transactionshead">
                    <li>S.no</li>
                    <li>Date</li>
                    <li>Transaction Details</li>
                    <li>Value Date</li>
                    <li>Withdrawal AMT</li>
                    <li>Deposit AMT</li>
                    <li>Balance AMT</li>
                </ul>
                {transactions}
            </div>
        )
    }
}

export default Transactions

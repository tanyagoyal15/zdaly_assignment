import React, { Component } from 'react'

export class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions : [],
            currentPage: 1,
            transactionsPerPage: 10
        }
    }

    componentDidMount() {
        fetch("/bankAccount")
            .then(res => {
                return res.json();
            })
            .then(res => this.setState({ transactions: res }))
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { transactions, currentPage, transactionsPerPage } = this.state;

        const indexOfLastTransaction = currentPage * transactionsPerPage;
        const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
        const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

        const renderTransactions = currentTransactions.map((transaction , idx) => {
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


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(transactions.length / transactionsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    style={{border : '1px solid #ccc' , padding : '5px' , cursor : 'pointer'}}
                >
                    {number}
                </li>
            );
        });

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
                <div>
                    {renderTransactions}
                    {
                        renderTransactions.forEach(function (el) {
                            Object.keys(el).forEach(function (property) {
                                if (el[property] === '') {
                                    el[property] = '-';
                                }
                            });
                        })
                    }
                    <ul id="page-numbers">
                        {renderPageNumbers}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Transactions

import React, { Component } from 'react'
import "../App.css"

export class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions : [],
            filteredTransactions: [],
            inputValue: '',
            currentPage: 1,
            transactionsPerPage: 10,
        }
    }

    componentDidMount() {
        fetch("/bankAccount")
            .then(res => {
                return res.json();
            })
            .then(res => this.setState({ transactions: res , filteredTransactions: res }))
    }

    handleInput = (e) => {
        this.setState({ inputValue: e.target.value });
        this.listTransactions();
    }
 
    handleClick = (event) => {
        event.preventDefault()
        this.setState({
            currentPage: Number(event.target.id),
        });
    }

    listTransactions() {
        this.setState(state => {
            if (state.inputValue !== '') {
                return {
                    filteredTransactions: state.transactions.filter(b =>
                        b["Transaction Details"].toLowerCase().includes(`${this.state.inputValue.toLowerCase()}`) || 
                        b["Date"].toLowerCase().includes(this.state.inputValue.toLowerCase()) 
                    )
                }
            }

            return { filteredTransactions: state.transactions }
        })
    }
    render() {
        const {transactions , filteredTransactions , currentPage, transactionsPerPage } = this.state;

        const indexOfLastTransaction = currentPage * transactionsPerPage;
        const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
        const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

        const renderTransactions = currentTransactions.map((transaction , idx) => {
            return <ul className="transactions">
                <li key={idx}>{++idx}</li>
                <li key={idx}>{transaction["Date"]}</li>
                <li key={idx}>{transaction["Transaction Details"]}</li>
                <li key={idx}>{transaction["Value Date"]}</li>
                <li key={idx}>{transaction["Withdrawal AMT"] === '' ? transaction["Withdrawal AMT"] = '-' : transaction["Withdrawal AMT"] = `${transaction["Withdrawal AMT"]}`}</li>
                <li key={idx}>{transaction["Deposit AMT"] === '' ? transaction["Deposit AMT"] = '-' : transaction["Deposit AMT"] = `${transaction["Deposit AMT"]}`}</li>
                <li key={idx}>{transaction["Balance AMT"]}</li>
            </ul>
        })


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredTransactions.length / transactionsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    className="pagenumbers">               
                    {number}
                </li>
            );
        });

        return (
            <React.Fragment>
                <div className="container">
                    <input type="text" placeholder="Search for transaction details by Date and recipient..." className="searchbar" onChange={(e) => this.handleInput(e)} />
                </div>
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
                    <div style={{paddingBottom: '20px'}}>
                        {renderTransactions}
                        <ul id="pagination">
                            <span style={{padding : '2px' , marginRight : '5%'}}>Page {this.state.currentPage}/{pageNumbers.length}</span>
                            {renderPageNumbers}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Transactions

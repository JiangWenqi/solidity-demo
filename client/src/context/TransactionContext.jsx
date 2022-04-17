import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount") || 0);
    const [transactions, setTransactions] = useState([]);


    /**
     * handle transaction form data
     */
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    /**
     * Check if the wallet is connected, if connected, set the current account
     */
    const initCurrentAccount = async () => {
        try {
            if (!ethereum) {
                return alert('Please install the MetaMask');
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                loadTransactions();
            } else {
                console.warn('No accounts found, need to connect wallet firstly');
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * connect to the MetaMask, and add the first account to the current account
     */
    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert('Please install the MetaMask');
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("Current Account is Connected: %o", currentAccount);
            } else {
                console.warn("No account found.");
            }
        } catch (error) {
            throw new Error(error);
        }
    }


    const sendTransaction = async () => {
        try {
            const { addressTo, amount, keyword, message } = formData;
            console.log("Transaction Information: %o", formData);

            const transactionContract = createEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",// 21000
                    value: parsedAmount._hex,
                }],
            });

            const transaction = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log("start transfer: ", transaction.hash);
            await transaction.wait();
            console.log("successful transfer:", transaction.hash);
            setIsLoading(false);
            const transactionsCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionsCount.toNumber());
            window.location.reload();

        } catch (error) {
            throw new Error(error);
        }
    }


    const loadTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const transactionContract = createEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
            setTransactions(structuredTransactions);
            const currentTransactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", currentTransactionCount);
            console.log("load %d transactions", currentTransactionCount);
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        initCurrentAccount();
    }, []);

    return (
        < TransactionContext.Provider value={{
            currentAccount,
            connectWallet,
            formData,
            handleChange,
            sendTransaction,
            isLoading,
            transactionCount,
            transactions
        }}>
            {children}
        </TransactionContext.Provider >
    );
}
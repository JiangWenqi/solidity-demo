import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.provider.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");

    /**
     * Check if the wallet is connected
     */
    const initCurrentAccount = async () => {
        if (!ethereum) {
            return alert('Please install the MetaMask');
        }
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        } else {
            console.error('No accounts found, need to connect wallet');
        }
    }

    /**
     * load the account into account context
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
                console.error("No account found.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        initCurrentAccount();
    }, []);

    return (
        < TransactionContext.Provider value={{
            currentAccount,
            connectWallet
        }}>
            {children}
        </TransactionContext.Provider >
    );
}
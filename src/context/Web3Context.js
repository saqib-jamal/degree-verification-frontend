import React, {useEffect, createContext, useContext, useState} from 'react';
import {ethers} from 'ethers';
import VerificationABI from '../Contracts/Verification.json';

const CONTRACT_ADDRESS = "0xd378f800a37F03567FA8ef93De4f8e59D7ae1880";
const Web3Context = createContext({});

export const useWeb3 = () => useContext(Web3Context);
export const Web3Provider = ({children}) => {


    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isUniversity, setIsUniversity] = useState(false);
    const [loading, setLoading] = useState(false);


    const connectWallet = async () => {
        console.log("connectWallet called");
    try {
        console.log("try block checking!");
        if (!window.ethereum) {
            alert("Please install MetaMask");
            return;
        }
        console.log("metamask detected");
   const accounts = await window.ethereum.request({ 
    method: 'eth_requestAccounts' 
});

console.log("accounts:", accounts);
   const provider = new ethers.BrowserProvider(window.ethereum);
   const signer = await provider.getSigner();

   const contractInstance = new ethers.Contract(
    CONTRACT_ADDRESS,
    VerificationABI.abi,
    signer
);
   setContract(contractInstance);

   setAccount(accounts[0]);
   const owner = await contractInstance.owner();

   console.log("Contract owner:", owner);
   console.log("Connected account:", accounts[0]);
   console.log("isOwner result:", accounts[0].toLowerCase() === owner.toLowerCase());

   setIsOwner(accounts[0].toLowerCase() === owner.toLowerCase());
   const universityStatus = await contractInstance.isUniversity(accounts[0]);
   console.log("University status for", accounts[0], ":", universityStatus);
   setIsUniversity(universityStatus);

   } catch (error) {
        console.error("Connection error:", error);
        console.log("Error message:", error.message);
    }
}
   useEffect(() => {
        if (window.ethereum) {
            connectWallet();
        }
    }, []);

    useEffect(() => {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                connectWallet();
            }
        });
    }
    return () => {
        if (window.ethereum) {
            window.ethereum.removeAllListeners('accountsChanged');
        }
    };
}, []);


    return(
        <Web3Context.Provider value={{
            account,
            contract,
            isOwner,
            isUniversity,
            loading,
            setLoading,
            connectWallet

        }}>
            {children} 
        </Web3Context.Provider>
    );

}

export default Web3Provider;
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Payment from "../Payment";

const Wallet = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [provider, setProvider] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && defaultAccount == null) {
      // set ethers provider
      setProvider(new ethers.providers.Web3Provider(window.ethereum));

      // connect to metamask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setConnButtonText("Wallet Connected");
          setDefaultAccount(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else if (!window.ethereum) {
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  useEffect(() => {
    if (defaultAccount) {
      provider.getBalance(defaultAccount).then((balanceResult) => {
        setUserBalance(ethers.utils.formatEther(balanceResult));
      });
    }
  }, [defaultAccount, provider]);

  return (
    <div className="w-full mt-4">
      <h4 className="mb-4"> Connection to MetaMask </h4>
      <button
        className="btn btn-secondary submit-button focus:ring focus:outline-none w-60"
        onClick={connectWalletHandler}
      >
        {connButtonText}
      </button>
      <div className="w-2/4 m-auto pl-4">
        <div className="mb-4 mt-4">
          <h3 className="text-left">
            Address: {defaultAccount === null ? "N/A" : defaultAccount}
          </h3>
        </div>
        <div>
          <h3 className="text-left">
            Balance: {userBalance === null ? "N/A" : userBalance}
          </h3>
        </div>
      </div>
      {errorMessage}
      <Payment balance={userBalance} />
    </div>
  );
};

export default Wallet;

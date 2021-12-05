import WalletConnectProvider from '@walletconnect/web3-provider';
import React from 'react'
import Web3 from "web3";
import Web3Modal from "web3modal";


const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "6a626d95c471444e866bd5521f0dc286" // required
    }
  }
};

const Connect = () => {
    
      
      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions// required
      });
      
      const provider =  web3Modal.connect();
      
      const web3 = new Web3(provider);
      console.log(web3)

      
    return (
        <div>
        </div>
    )
}

export default Connect

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react";

import { ethers, utils } from 'ethers';

const StateContext = createContext({} as any);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    // state logic here

    const { contract, error }: any = useContract("0xe0A8505673180b627a46f55cBe0D844cEf78A3dE");
    const address = useAddress();
    const connect = useMetamask();

    const { mutateAsync: addTicketOwner, isLoading } = useContractWrite(contract, "addTicketOwner")

    const [nftAsset, setNftAsset] = useState(
        {
            images: {}
        }
    );

    const [ticketNumber, setTicketNumber] = useState(0);

    useEffect(() => {
        const getNFTAssets = async () => {
            const data = await fetch("https://bafybeig7n2tc6gbkunybjfahwz4fsbso4roz7nw6fw45pqomjlkoxllb6a.ipfs.w3s.link/nftTicket.json");
            const response = await data.json();
            setNftAsset(response);
        }
        getNFTAssets();
    }, [])

    // Functions

    const addTicket = async (_amount: string, _typeOfTicket: string, _imgUrl: string) => {

        try {
            const val = ethers.utils.parseEther(_amount);
            const data = contract.call('addTicketOwner', address, val, _typeOfTicket, _imgUrl,
                {
                    value: val
                }
            );
            console.info("contract call successs", data);

            return data;
        }
        catch (err) {
            console.error("Contract call failure");
            return err;
        }
    }

    const getTransactions = async () => {
        let allTransaction = [];
        try {
            const transactions = await contract.call('getAllTransactions');
            allTransaction = transactions.map((i: any) => {
                const timestamp = new Date(i.time.toNumber() * 1000).toLocaleString();
                return (
                    {
                        to: i.to,
                        from: i.from,
                        time: timestamp,
                        amount: utils.formatEther(i.amount),
                        type: i.typeOfTransaction,
                        desc: i.description
                    }
                );
            });

        } catch (err) {
            console.error(err);
        }
        return allTransaction;
    }


    return (
        <StateContext.Provider value={
            {
                address,
                contract,
                connect,
                nftAsset,
                setNftAsset,
                ticketNumber,
                setTicketNumber,
                addTicket
            }
        }>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);
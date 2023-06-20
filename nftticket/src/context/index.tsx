import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react";

import { ethers, utils } from 'ethers';

const StateContext = createContext({} as any);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    // state logic here

    const { contract, error }: any = useContract("0x1ce07BD3521e11AA8eaF11998d2Df52e33e58C96");
    const address = useAddress();
    const connect = useMetamask();

    const [activePage, setActivePage] = useState("home");

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

    const getTickets = async () => {
        let allTickets = [];
        try {
            const transactions = await contract.call('getAllTickets');
            allTickets = transactions.map((i: any) => {
                const timestamp = new Date(i.time.toNumber() * 1000).toLocaleString();
                return (
                    {
                        owner: i.owner,
                        time: timestamp,
                        amount: utils.formatEther(i.amount),
                        type: i.typeOfTicket,
                        imgUrl: i.imgUrl
                    }
                );
            });

        } catch (err) {
            console.error(err);
        }
        return allTickets;
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
                addTicket,
                activePage,
                setActivePage,
                getTickets
            }
        }>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);
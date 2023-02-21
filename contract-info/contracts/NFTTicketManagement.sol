// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract NFTTicketManagement {
    // Define the Transaction struct
    struct Tickets {
        address owner;
        uint256 amount;
        string typeOfTicket;
        uint256 time;
        string imgUrl;
    }

    struct Transaction {
        address to;
        address from;
        uint256 amount;
        uint256 timestamp;
        string ticketType;
    }

    // Define global variables
    uint256 public StandardTicketCost = 0;
    uint256 public PremiumTicketCost = 0;
    uint256 public numberOfTickets = 0;
    uint256 public numberOfTransactions = 0;
    address public concertManager;

    // Mappings
    mapping(uint256 => Tickets) public tickets;
    mapping(uint256 => Transaction) public transactions;

    // Define events
    event addOwner(address owner, uint256 amount, string typeOfTicket);
    event Payment(address ownerAddress, uint256 amount);

    // Define the constructor
    constructor() {
        concertManager = msg.sender;
        StandardTicketCost = 1;
        PremiumTicketCost = 3;
    }

    function addTicketOwner(
        address _owner,
        uint256 _amount,
        string memory _typeOfTicket,
        string memory _imgUrl
    ) public payable returns (uint256) {
        address newAddress = msg.sender;
        require(
            newAddress != concertManager,
            "The manager couldn't buy the tickets."
        );
        bool success;
        (success, ) = _owner.call{value: _amount}("");
        require(success, "Transfer failed.");

        Transaction storage newTransaction = transactions[numberOfTickets];
        newTransaction.to = newAddress;
        newTransaction.from = concertManager;
        newTransaction.amount = _amount;
        newTransaction.timestamp = block.timestamp;
        newTransaction.ticketType = _typeOfTicket;
        numberOfTransactions++;

        emit Payment(_owner, _amount);

        // Adding the Tickets' Owner Details.
        Tickets storage newTicket = tickets[numberOfTickets];

        newTicket.owner = _owner;
        newTicket.amount = _amount;
        newTicket.typeOfTicket = _typeOfTicket;
        newTicket.time = block.timestamp;
        newTicket.imgUrl = _imgUrl;

        numberOfTickets++;

        // Store the addEmployee transaction into the logs
        emit addOwner(_owner, _amount, _typeOfTicket);

        return numberOfTickets - 1;
    }
}

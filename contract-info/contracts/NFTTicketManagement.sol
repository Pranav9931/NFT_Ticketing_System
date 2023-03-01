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
    event addTicket(address owner, uint256 amount, string typeOfTicket);
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
        address newOwner = msg.sender;
        bool success;
        (success, ) = concertManager.call{value: _amount}("");
        require(success, "Transfer failed.");

        Transaction storage newTransaction = transactions[numberOfTickets];
        newTransaction.to = concertManager;
        newTransaction.from = newOwner;
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
        emit addTicket(_owner, _amount, _typeOfTicket);

        return numberOfTickets - 1;
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        Transaction[] memory allTransactions = new Transaction[](
            numberOfTransactions
        );

        for (uint256 i = 0; i < numberOfTransactions; i++) {
            Transaction storage item = transactions[i];

            allTransactions[i] = item;
        }

        return allTransactions;
    }

    function getAllTickets() public view returns (Tickets[] memory) {
        Tickets[] memory allTickets = new Tickets[](numberOfTickets);

        for (uint256 i = 0; i < numberOfTickets; i++) {
            Tickets storage item = tickets[i];

            allTickets[i] = item;
        }

        return allTickets;
    }
}

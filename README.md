# EthPolls
Polls that are held on the Ethereum blockchain that ensure data security, voting integrity and decentralization.

Online poll voting and statistics derived from these votes suffer the vulnerabilities of voting bots, uneducated users regarding the voting topic and a centralized third party hosting the vote. 

A real world example of these issues is amongst many exchanges. Exchanges often hold votes in which they allow users to vote on which coins they want as a listed asset on the exchange. The coin with the most votes wins. More often then not, coin developers/project leaders pay for voting bots or dishonestly encourage the community to vote on their project.

Holding votes on a blockchain allows for votes to be protected from voting bots via Ethereum's protocol (specifically gas transaction fees), this also eliminates the incentive for uneducated users to vote since each vote will cost a small amount of Ether and each voter can only vote once. EthPolls removes the third party and ensures additional security and honesty regarding votes.

This project is not yet completed and would appreciate the contribution and feedback of others in the community.


*note: there is not yet an official contract deployed onto an ethereum network so for these instructions the contract will be deployed as well. *

# Yes/No Poll Creation Instructions

1. Visit https://remix.ethereum.org/
2. Copy the yesNoPoll.sol code from the PollCode folder and paste it into the remix editor.
3. Make sure that you have Metamask installed and are connected to the network of your choice.
4. Deploy the contract.
5. Click on the createPoll button under the deployed contract heading and your poll will be created.

# Yes/No Poll Voting Instructions

1. Visit https://remix.ethereum.org/
2. Make sure you have metamask installed and both the address of the contract deployed and the address of the user who created the poll.
3. Input the contract address under the heading "Load from contract Address", then click the At Address Button.
4. Under the deployed contract heading fill in the box with the poll's creators address and your vote.
  *In this format: 0x8e73aef2448068d4e31f86aa08279465339ff601,"yes"*
5. Click on vote and your vote will be submited.

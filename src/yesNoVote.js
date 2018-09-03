import web3 from './web3';

const address = '0x267c595da13ca8fc71ed3bfecef9d4acf2462664';

const abi =
[
{
	"constant": false,
	"inputs": [
		{
			"name": "creatorAddress",
			"type": "address"
		},
		{
			"name": "decision",
			"type": "string"
		}
	],
	"name": "vote",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"constant": true,
	"inputs": [
		{
			"name": "_user",
			"type": "address"
		}
	],
	"name": "displayNoVotes",
	"outputs": [
		{
			"name": "",
			"type": "uint256"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": true,
	"inputs": [
		{
			"name": "_user",
			"type": "address"
		}
	],
	"name": "displayYesVotes",
	"outputs": [
		{
			"name": "",
			"type": "uint256"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": false,
	"inputs": [
		{
			"name": "description",
			"type": "string"
		}
	],
	"name": "createPoll",
	"outputs": [
		{
			"name": "",
			"type": "bool"
		}
	],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"constant": false,
	"inputs": [
		{
			"name": "_user",
			"type": "address"
		}
	],
	"name": "destroyPoll",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"constant": true,
	"inputs": [
		{
			"name": "_user",
			"type": "address"
		}
	],
	"name": "displayDescription",
	"outputs": [
		{
			"name": "",
			"type": "string"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}
]

export default new web3.eth.Contract(abi, address);

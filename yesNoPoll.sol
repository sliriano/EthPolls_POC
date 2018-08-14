pragma solidity ^0.4.24;

contract yesNoPoll {

    struct Poll {
        uint yes;
        uint no;
        address[] noVotes;
        address[] yesVotes;
        mapping(address=>bool) hasVoted;
    }

    mapping(address=>Poll) public polls;
    mapping(address=>bool) public hasPoll;

    function createPoll() public returns(string) {
        address[] no; //fillers to pass into the creation of poll
        address[] yes;
        address creator = msg.sender;
        if (_checkPoll(creator)) { // if user has a poll then..
            return "You must destroy your other poll in order to create a new one";
        }
        else {
            polls[creator] = Poll(0,0,no,yes); // create poll
            hasPoll[creator] = true; // establishes that user has a poll
            return "Creation complete";
        }
    }

    function _checkPoll(address _user) private view returns (bool){
        if(hasPoll[_user]){ //checks if the user currently has a poll
            return true;
        }
        return false;
    }

    function vote(address creatorAddress, string decision) public {
        if(_checkVoter(msg.sender,creatorAddress) == false) { // if the user has not yet voted
            if (keccak256(decision) == keccak256("yes")) { // if user votes yes
                polls[creatorAddress].yes +=1; // add one to the yes value
                polls[creatorAddress].yesVotes.push(msg.sender); // add user to array
            }
            else if (keccak256(decision) == keccak256("no")) {
                polls[creatorAddress].no +=1;
                polls[creatorAddress].noVotes.push(msg.sender);
            }
            polls[creatorAddress].hasVoted[msg.sender] = true;
        }
    }

    function _checkVoter(address _user, address creator) private view returns (bool) {
        if (polls[creator].hasVoted[_user]){ // checks if voter has voted yet
            return true;
        }
        return false;
    }

    function destroyPoll(address _user) public {
        if (_user == msg.sender) {
            address[] no; //fillers to pass into the creation of poll
            address[] yes;
            hasPoll[_user] = false;
            polls[_user] = Poll(0,0,no,yes); //replace the last poll with an empty one.
        }
    }
}

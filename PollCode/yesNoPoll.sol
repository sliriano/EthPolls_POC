pragma solidity >=0.4.22 <0.6.0;

contract yesNoPoll {

    struct Poll {
        address[] noVotes;
        address[] yesVotes;
        address[] totalVotes;
        mapping(address=>bool) hasVoted;
        string description;
    }

    mapping(address=>Poll) polls;

    function createPoll(string memory description) public returns(bool) {
        address[] memory no; //fillers to pass into the creation of poll
        address[] memory yes;
        address[] memory total;
        if (_checkPoll(msg.sender) == false) { // if user already has a poll then..
            return false;
        }
        else {
            polls[msg.sender] = Poll(no,yes,total,description); // create poll
            return true;
        }
    }

    function _checkPoll(address _user) private view returns (bool){
        if(polls[_user].totalVotes.length == 0){ //checks if the user currently has a poll with over 0 votes
            return true;
        }
        return false;
    }

    function vote(address creatorAddress, uint256 decision) public returns(bool) {
        if(_checkVoter(msg.sender,creatorAddress) == false) { // if the user has not yet voted
            if (decision == 1) { // if user votes yes
                polls[creatorAddress].yesVotes.push(msg.sender); // add user to yes array
            }
            else if (decision == 0) { // if user votes no
                polls[creatorAddress].noVotes.push(msg.sender); // add user to no array
            }
            else if (decision != 1 && decision != 0){ // if user votes neither 0 or 1, return false
                return false;
            }
            polls[creatorAddress].hasVoted[msg.sender] = true;
            polls[creatorAddress].totalVotes.push(msg.sender);
            return true;
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
            for (uint x = 0; x < polls[_user].totalVotes.length; x++){
                polls[_user].hasVoted[polls[_user].totalVotes[x]] = false;
            }
            delete polls[_user];
        }
    }

    function displayNoVotes(address _user) public view returns (uint){
        return polls[_user].noVotes.length;
    }

    function displayYesVotes(address _user) public view returns (uint) {
        return polls[_user].yesVotes.length;
    }
    
    function displayDescription(address _user) public view returns (string memory) {
        return polls[_user].description;
    }
}

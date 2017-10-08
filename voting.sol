pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

// import "./authentication.sol";


contract Authentication {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  

  function Authentication(bytes32[] myList,bytes32[] constituencies) {
  }

  function isVoterExist(bytes32 voter) returns (bool) {
  }

  function isVoteAvailable(bytes32 voter) returns (bool)  {
  }

  function getVoterConstituency(bytes32 voter)returns (string) {
  }

  // This function returns the total votes a candidate has received so far
  function isAuthentic(bytes32 voter) returns (bool) {
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote

  function validVoter(bytes32 voter) returns (bool) {
  }

  function bytes32ToString(bytes32 x) constant returns (string) {
  }

}





contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => uint8) public votesReceived;

  Authentication authObj = Authentication("0xdac8aca0bb732d6513191c965f35481fc4e7502f")

  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bytes32[] public candidateList;
  mapping (bytes32 => bytes32) public constituencyDict;



  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] candidateNames, bytes32[] constituencies) {
    candidateList = candidateNames;
    for(uint i = 0; i < candidateNames.length; i++) {
      constituencyDict[candidateNames[i]] = constituencies[i];
    }
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) returns (uint8) {
    if (validCandidate(candidate) == false) throw;
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate) {
    if (validCandidate(candidate) == false) throw;
    votesReceived[candidate] += 1;
  }

  function getCandidateConstituency(bytes32 candidate)returns (string) {
    if (validCandidate(candidate) == false)
      throw;
    return bytes32ToString(constituencyDict[candidate]);
  }

  function validCandidate(bytes32 candidate) returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function bytes32ToString(bytes32 x) constant returns (string) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
        byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
        if (char != 0) {
            bytesString[charCount] = char;
            charCount++;
        }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
  }

}

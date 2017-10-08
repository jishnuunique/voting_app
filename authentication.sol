pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with


contract Authentication {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => bool) public votesAvailable;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bytes32[] public voterList;
  mapping (bytes32 => bytes32) public constituencyDict;


  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Authentication(bytes32[] myList,bytes32[] constituencies) {
    voterList=myList;

    for(uint i = 0; i < voterList.length; i++) {
      // voterList[i] = myList[i];
      // constituencyDict[voterList[i]]=myList[3+i];
      votesAvailable[voterList[i]] = true;
      constituencyDict[voterList[i]] = constituencies[i];

    }
    // voterList=myVoterList;
  }

  function isVoterExist(bytes32 voter) returns (bool) {
    for(uint i = 0; i < voterList.length; i++) {
      if (voterList[i] == voter) {
        return true;
      }
    }
    return false;
  }

  function isVoteAvailable(bytes32 voter) returns (bool)  {
    return votesAvailable[voter];
  }

  function getVoterConstituency(bytes32 voter)returns (string) {
    return bytes32ToString(constituencyDict[voter]);
  }

  // This function returns the total votes a candidate has received so far
  function isAuthentic(bytes32 voter) returns (bool) {
    if (validVoter(voter) == true)
    {
      votesAvailable[voter]=false;

      return true;
    }
    return false;
  }

  function ping()returns (bool){
    return true;
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote

  function validVoter(bytes32 voter) returns (bool) {
    return isVoterExist(voter) && isVoteAvailable(voter);
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

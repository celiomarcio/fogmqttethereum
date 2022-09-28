pragma solidity ^0.5.1;

contract ConceptProof {
    uint8 private state; 

    constructor() public {
        state =0;
    }

    event changeState(uint timeChanged);

    function set_mystate(uint8 _state) public payable {
        require (_state >= 0 && _state <=2);
        state = _state;
        emit changeState(now);
    }

    function get_mystate() public view returns(uint8){
        return state;
    }

    function get_time() public view returns(uint){
        uint time = now;
        return time;
    }

}
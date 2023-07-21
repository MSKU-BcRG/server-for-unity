// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.19 <0.9.0;


contract auth_symbol{
    struct User {
        uint userId;
        uint symbolId;
        bool exists;
    }

    mapping(uint => User) public users;
    
    function setSymbol(uint userId, uint symbolId) public {
        if(users[userId].exists) {
            users[userId].symbolId = symbolId;
        }else {
            
            User memory user = User(userId, symbolId, true);
            users[userId] = user;
        }  
    }

    function checkSymbol(uint userId, uint symbolId) public view returns (bool) {
        User memory user = users[userId];
        return user.symbolId == symbolId;    
    }

    function userExists(uint userId) public view returns (bool) {
        return users[userId].exists;
    }
}
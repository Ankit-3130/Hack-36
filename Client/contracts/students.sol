// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

library Math{
     function log10(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >= 10 ** 64) {
                value /= 10 ** 64;
                result += 64;
            }
            if (value >= 10 ** 32) {
                value /= 10 ** 32;
                result += 32;
            }
            if (value >= 10 ** 16) {
                value /= 10 ** 16;
                result += 16;
            }
            if (value >= 10 ** 8) {
                value /= 10 ** 8;
                result += 8;
            }
            if (value >= 10 ** 4) {
                value /= 10 ** 4;
                result += 4;
            }
            if (value >= 10 ** 2) {
                value /= 10 ** 2;
                result += 2;
            }
            if (value >= 10 ** 1) {
                result += 1;
            }
        }
        return result;
    }
}
contract studentRecords {
    mapping (string => address) public record;
    uint counter=1;
    event studentCreated(
        address indexed owner,
        string indexed aadhar,
        string studentId,
        address hexStudentId,
        string name,
        string dob,
        string _aadhar,
        uint uptoQual
    );
    event studentRegistered(
        address indexed owner,
        uint indexed course,
        uint indexed timestamp,
        address studentId,
        string name,
        string dob
        
    );

    function createStudentId(string memory _name, string memory _dob, string memory _aadhar,uint uptoQual)   public {
        student s1=new student(_name,_dob,_aadhar,uptoQual);
        string memory indx=toString(counter);
        record[indx]=address(s1);
        
        emit studentCreated( 
            msg.sender,
            _aadhar,
            indx,
            address(s1),
            _name,
            _dob,
             _aadhar,
            uptoQual
        );

        counter++;
    }

    function register(string memory _name, string memory _dob, uint course,string memory studentId) public {
        emit studentRegistered(
            msg.sender,
            course, 
            block.timestamp,
            record[studentId], 
            _name, _dob);
    }
  function toString(uint256 value) public pure returns (string memory) {
        unchecked {
            uint256 length = Math.log10(value) + 1;
            string memory buffer = new string(length);
            uint256 ptr;
            /// @solidity memory-safe-assembly
            assembly {
                ptr := add(buffer, add(32, length))
            }
            while (true) {
                ptr--;
                /// @solidity memory-safe-assembly
                assembly {
                    mstore8(ptr, byte(mod(value, 10), "0123456789abcdef"))
                }
                value /= 10;
                if (value == 0) break;
            }
            return buffer;
        }
    }
  
}

contract student{
    string public name;
    string public dob;
    string public aadhar;
    
    enum uptoQualification{ TENTH,TWELFTH,COLLEGE }
    uptoQualification public qualification;

    event certificateUploaded(
        address indexed doc,
        uint indexed course,
        string url
    );

    constructor(string memory _name, string memory _dob, string memory _aadhar,uint uptoQual){
        name=_name;
        dob=_dob;
        aadhar=_aadhar;
        qualification=uptoQualification(uptoQual);
        
    }
    
    function feedData(uint course,string memory _url) public {
        certificate c=new certificate(course,_url);
        emit certificateUploaded(
            address(c),
            course,
            _url
        );
    }

}

contract certificate{
    uint public course;
    string public url;
    constructor(uint _course, string memory _url){
        course=_course;
        url=_url;
    }
}



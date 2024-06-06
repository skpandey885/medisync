// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineTracking {
    // Structure to represent a medicine
    struct Medicine {
        uint id;
        string name;
        uint quantity;
    }

    // Structure to represent a hospital
    struct Hospital {
        string id;
        string name;
        uint[] medicineIds;
        mapping(uint => Medicine) medicines;
    }

    // Admin mapping to keep track of admin addresses
    mapping(address => bool) public isAdmin;

    // Mapping to store hospitals using their ID
    mapping(string => Hospital) public hospitals;

    // Array to store hospital IDs
    string[] public hospitalIds;

    // Events for tracking actions
    event HospitalRegistered(string hospitalId, string name);
    event MedicineSent(string hospitalId, uint medicineId, uint quantity);
    event MedicineReceived(string hospitalId, uint medicineId, uint quantity);

    // Modifier to restrict functions to only admin
    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Permission Denied. You do not have admin access.");
        _;
    }

    // Constructor to set the deployer as the initial admin
    constructor() {
        isAdmin[msg.sender] = true;
    }

    // Function to add a new admin
    function addAdmin(address newAddress) public onlyAdmin {
        require(newAddress != address(0), "Invalid address");
        isAdmin[newAddress] = true;
    }

    // Function to check if the caller is an admin
    function checkIfAdmin() public view returns (bool) {
        return isAdmin[msg.sender];
    }

    // Function to register a hospital (restricted to admin)
    function registerHospital(string memory hospitalId, string memory name) public onlyAdmin {
        require(bytes(hospitals[hospitalId].id).length == 0, "Hospital already registered");

        Hospital storage hospital = hospitals[hospitalId];
        hospital.id = hospitalId;
        hospital.name = name;
        hospitalIds.push(hospitalId);  // Add hospital ID to the array

        emit HospitalRegistered(hospitalId, name);
    }

    // Function to register multiple hospitals (restricted to admin)
    function registerMultipleHospitals(string[] memory hospitalIdst, string[] memory names) public onlyAdmin {
        require(hospitalIdst.length == names.length, "Input lengths do not match");

        for (uint i = 0; i < hospitalIdst.length; i++) {
            registerHospital(hospitalIdst[i], names[i]);
        }
    }

    // Function to add a medicine to a hospital's inventory (restricted to admin)
    function addMedicineToHospital(string memory hospitalId, uint medicineId, string memory name, uint quantity) public onlyAdmin {
        require(bytes(hospitals[hospitalId].id).length > 0, "Hospital not registered");

        Hospital storage hospital = hospitals[hospitalId];
        hospital.medicines[medicineId] = Medicine(medicineId, name, quantity);
        hospital.medicineIds.push(medicineId);
    }

    // Function to send medicines from distribution center to hospital (restricted to admin)
    function sendMedicineToHospital(string memory hospitalId, uint[] memory medicineIds, uint[] memory quantities) public onlyAdmin {
        require(medicineIds.length == quantities.length, "Invalid input lengths");
        require(bytes(hospitals[hospitalId].id).length > 0, "Hospital not registered");

        Hospital storage hospital = hospitals[hospitalId];

        for (uint i = 0; i < medicineIds.length; i++) {
            uint medicineId = medicineIds[i];
            uint quantity = quantities[i];

            if (hospital.medicines[medicineId].id == 0) {
                hospital.medicines[medicineId] = Medicine(medicineId, "", 0);
                hospital.medicineIds.push(medicineId);
            }

            hospital.medicines[medicineId].quantity += quantity;

            emit MedicineSent(hospitalId, medicineId, quantity);
        }
    }

    // Function for hospitals to update their medicine stock (restricted to admin)
    function updateMedicineStock(string memory hospitalId, uint[] memory medicineIds, uint[] memory quantities) public onlyAdmin {
        require(medicineIds.length == quantities.length, "Invalid input lengths");
        require(bytes(hospitals[hospitalId].id).length > 0, "Hospital not registered");

        Hospital storage hospital = hospitals[hospitalId];

        for (uint i = 0; i < medicineIds.length; i++) {
            uint medicineId = medicineIds[i];
            uint quantity = quantities[i];

            require(hospital.medicines[medicineId].quantity >= quantity, "Insufficient medicine quantity at hospital");

            hospital.medicines[medicineId].quantity = quantity;

            emit MedicineReceived(hospitalId, medicineId, quantity);
        }
    }

    // Function to get all medicines and their quantities at a specific hospital
    function getMedicinesAtHospital(string memory hospitalId) public view returns (uint[] memory, string[] memory, uint[] memory) {
        require(bytes(hospitals[hospitalId].id).length > 0, "Hospital not registered");

        Hospital storage hospital = hospitals[hospitalId];
        uint length = hospital.medicineIds.length;

        uint[] memory medicineIds = new uint[](length);
        string[] memory medicineNames = new string[](length);
        uint[] memory quantities = new uint[](length);

        for (uint i = 0; i < length; i++) {
            uint medicineId = hospital.medicineIds[i];
            medicineIds[i] = hospital.medicines[medicineId].id;
            medicineNames[i] = hospital.medicines[medicineId].name;
            quantities[i] = hospital.medicines[medicineId].quantity;
        }

        return (medicineIds, medicineNames, quantities);
    }

    // Function to get all hospitals data
    function getHospitalsData() public view returns (string[] memory, string[] memory) {
        uint length = hospitalIds.length;

        string[] memory ids = new string[](length);
        string[] memory names = new string[](length);

        for (uint i = 0; i < length; i++) {
            ids[i] = hospitals[hospitalIds[i]].id;
            names[i] = hospitals[hospitalIds[i]].name;
        }

        return (ids, names);
    }
}

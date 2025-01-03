const { expect } = require('chai')
const { ethers } = require('hardhat')
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');

describe('Crypto Pages', function () {
    async function deployContract() {
        const [admin, other] = await ethers.getSigners(); // aa particular networlile open accounts kittan
        const Crypto = await ethers.getContractFactory('CryptoPages'); //get instance of our contract getContreactFactory()
        const contractAddress = await Crypto.deploy(); // it deploy the instance and return a contract address
        return {  contractAddress ,admin, other}
    }
    it("should be deploy only by admin!", async function () {
        const { contractAddress,admin} = await loadFixture(deployContract);
        console.log(admin.address);
        expect(contractAddress.deploymentTransaction().from).to.equals(admin.address);//this expect check that, the deploymentTransaction aaranu deployee cheithathu ennulla data from vazhi tharunnu. to.equal is a function to compare the admin address and the from address aare eqaul aano ennanu

    })

    it("Able to add Book", async function() {
        const { contractAddress, admin, other } = await loadFixture(deployContract);
        await contractAddress.addBook("One", "Dev", "description", "123345678", 3, 2);
        const bookDetails = await contractAddress.books(1);
        console.log(bookDetails);
        expect(bookDetails[1]).to.equals("One"); // Price
    });
    
     it("Able to View Book", async function() {
        const { contractAddress, admin, other } = await loadFixture(deployContract);
        await contractAddress.addBook("One", "Dev", "description", "123345678", 3, 2);
        const books = await contractAddress.viewBooks();
        console.log(books);
        expect(books).to.be.an("array").that.is.not.empty; // Price
    });
})
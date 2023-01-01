const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('SimpleStorage', () => {
	let simpleStorageFactory;
	let simpleStorage;

	beforeEach(async function () {
		simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
		simpleStorage = await simpleStorageFactory.deploy();
	});

	it('should start with the favourite number of 0', async () => {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = '0';

		assert.equal(currentValue.toString(), expectedValue);
	});

	it('should update when we call store', async () => {
		const expectedValue = '4';
		const transactionResponse = await simpleStorage.store(4);
		await transactionResponse.wait(1);

		const currentValue = await simpleStorage.retrieve();
		assert.equal(currentValue.toString(), expectedValue);
	});
});

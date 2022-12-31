const { ethers, run, network } = require('hardhat');
require('dotenv').config();

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
	console.log('Deploying contract...');

	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();

	console.log(`Deployed contract to ${simpleStorage.address}`);

	if (network.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}
}

async function verify(contractAddress, args) {
	console.log('Verifying contract...');
	try {
		await run('verify:verify', {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		if (e.message.toLowerCase().includes('already verified')) {
			console.log('Already verified');
		} else {
			console.error(e);
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});

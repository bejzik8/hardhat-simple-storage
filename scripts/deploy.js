const { ethers, run, network } = require('hardhat')

async function main() {
    const SimpleStorageFactory =
        await ethers.getContractFactory('SimpleStorage')

    console.log('Deploying contract...')

    const simpleStorage = await SimpleStorageFactory.deploy()

    await simpleStorage.waitForDeployment()

    const contractAddress = await simpleStorage.getAddress()

    console.log(`Deployed contract to: ${contractAddress}`)

    const deploymentTransaction = await simpleStorage.deploymentTransaction()

    console.log('Deployment transaction:', deploymentTransaction)

    console.log('Network config:', network.config)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await deploymentTransaction.wait(6)
        await verify(contractAddress, [])
    }
}

async function verify(contractAddress, args) {
    console.log('Verifying contract...')

    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args
        })
    } catch (error) {
        console.log(
            error.message.toLowerCase().includes('already verified')
                ? 'Contract already verified'
                : error
        )
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })

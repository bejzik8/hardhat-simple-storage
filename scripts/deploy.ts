import { ethers, run, network } from 'hardhat'

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
        console.log('Waiting for etherscan to index contract...')
        await deploymentTransaction?.wait(6)
        await verify(contractAddress, [])
    }

    const currentValue = await simpleStorage.retrieve()

    console.log('Current value:', currentValue.toString())

    console.log('Updating value...')

    const transactionResponse = await simpleStorage.store(9)
    await transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()

    console.log('Updated value:', updatedValue.toString())
}

async function verify(contractAddress: string, args: any[]) {
    console.log('Verifying contract...')

    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args
        })
    } catch (error: any) {
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

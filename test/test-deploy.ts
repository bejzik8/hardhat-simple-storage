import { ethers } from 'hardhat'
import { assert, expect } from 'chai'
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types'

describe('Simple Storage', function () {
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage

    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory(
            'SimpleStorage'
        )) as unknown as SimpleStorage__factory

        simpleStorage = await simpleStorageFactory.deploy()
    })

    it('Should start with a favorite number of 0', async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = 0

        expect(currentValue).to.equal(expectedValue)
    })

    it('Should update when we call store', async function () {
        const expectedValue = '9'

        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })
})

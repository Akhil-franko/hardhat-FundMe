const { assert } = require("chai")
const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("0.5")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows to fund and withdraw", async () => {
              await fundMe.fund({ value: sendValue })
              const endingBal = await fundMe.provider.getBalance(fundMe.address)
              assert.equal(endingBal.toString(), "0")
          })
      })

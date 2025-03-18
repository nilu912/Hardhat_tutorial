async function main() {
  const [deployer] = await ethers.getSighners();

  const Token = await ethers.getContractFactory("Token");
  const hardhatToken = await Token.deploy();
  console.log("Contract address: ", hardhatToken.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

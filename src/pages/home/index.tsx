import SectionTitle from "./components/sectionTitle";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import {
  addresses,
  navigation,
  documentation,
  TESTNET_NAME,
} from "@/constants/index";

/**
 * Returns button to add network to MetaMask
 * @param {temp: any} autoconnect details
 * @returns {ReactElement}
 */
function AddNetworkButton({ autoconnect, walletName }: any) {
  /**
   * Adds network to MetaMask
   */
  const addToMetaMask = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [autoconnect],
    });
  };

  return (
    <a
      onClick={addToMetaMask}
      className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
    >
      Add to {walletName}
    </a>
  );
}

function TokenAddress({
  etherscanPrefix,
  symbol,
  address,
  ERC20,
  walletName,
}: any) {
  /**
   * Adds token to MetaMask
   */
  const addToMetaMask = async () => {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: address,
          symbol: symbol,
          decimals: 18,
        },
      },
    });
  };

  return (
    <a
      onClick={addToMetaMask}
      className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
    >
      Add to {walletName}
    </a>
  );
}

function ConnectWalletButton() {
  const { connectWallet } = useWeb3Context();
  return (
    <a
      onClick={connectWallet}
      className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
    >
      Connect Wallet
    </a>
  );
}

export default function Home() {
  const { walletName } = useWeb3Context();
  return (
    <>
      <div className="p-4 mx-[8px] mb-[40px] lg:p-8">
        <SectionTitle
          title={`Configure ${walletName || "wallet"} for our testnet`}
        >
          <div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
            Note: Please completely remove any previous Scroll L1 and L2
            networks from your {walletName} before proceeding. After re-adding
            each of them:
            <a
              className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
              target="_blank"
              href="https://guide.scroll.io/user-guide/common-errors#incorrect-nonce-error-when-sending-a-transaction-in-metamask"
              rel="noreferrer"
            >
              Reset {walletName || "wallet"} for both networks
            </a>
          </div>
          <div className="text-left">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-base font-medium text-black flex items-center">
                Layer 1
              </dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200"
                >
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-base">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">
                        {addresses[0].network}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? (
                        <AddNetworkButton
                          autoconnect={addresses[0].autoconnect}
                          walletName={walletName}
                        />
                      ) : (
                        <ConnectWalletButton />
                      )}
                    </div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-base">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">
                        {process.env.REACT_APP_USDC_SYMBOL} token on L1{" "}
                        {TESTNET_NAME}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? (
                        <TokenAddress
                          etherscanPrefix={addresses[0].etherscanPrefix}
                          symbol={process.env.REACT_APP_USDC_SYMBOL}
                          address={addresses[0].usdcAddress}
                          walletName={walletName}
                        />
                      ) : (
                        <ConnectWalletButton />
                      )}
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="bg-white  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-base font-medium text-black flex items-center">
                Layer 2
              </dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200"
                >
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-base">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">
                        {addresses[1].network}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? (
                        <AddNetworkButton
                          autoconnect={addresses[1].autoconnect}
                          walletName={walletName}
                        />
                      ) : (
                        <ConnectWalletButton />
                      )}
                    </div>
                  </li>

                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-base">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">
                        {process.env.REACT_APP_USDC_SYMBOL} token on L2{" "}
                        {TESTNET_NAME}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? (
                        <TokenAddress
                          etherscanPrefix={addresses[1].etherscanPrefix}
                          symbol={process.env.REACT_APP_USDC_SYMBOL}
                          address={addresses[1].usdcAddress}
                          walletName={walletName}
                        />
                      ) : (
                        <ConnectWalletButton />
                      )}
                    </div>
                  </li>

                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-base">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">
                        {process.env.REACT_APP_UNI_V2_TOKEN_SYMBOL} token on L2{" "}
                        {TESTNET_NAME}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? (
                        <TokenAddress
                          etherscanPrefix={addresses[1].etherscanPrefix}
                          symbol={process.env.REACT_APP_UNI_V2_TOKEN_SYMBOL}
                          address={addresses[1].uniV2TokenAddress}
                          walletName={walletName}
                        />
                      ) : (
                        <ConnectWalletButton />
                      )}
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </div>
        </SectionTitle>

        <SectionTitle title="Test the following">
          {navigation.slice(2).map((item, idx) => (
            <div
              key={item.name}
              className={`${
                idx % 2 ? "bg-white" : "bg-gray-50"
              } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-base font-medium text-gray-500">
                <a
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  href={item.subdomainOrPath}
                >
                  {item.name}
                </a>
              </dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                {item.description}
              </dd>
            </div>
          ))}
        </SectionTitle>

        <SectionTitle title="Read the documentation">
          {documentation.map((item, idx) => (
            <div
              key={item.name}
              className={`${
                idx % 2 ? "bg-white" : "bg-gray-50"
              } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-base font-medium text-gray-500">
                <a
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  href={item.link}
                >
                  {item.name}
                </a>
              </dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                {item.description}
              </dd>
            </div>
          ))}
        </SectionTitle>

        <SectionTitle title="Send us feedback">
          <div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-base font-medium text-black flex">
              <div className="mr-[4px]">
                <img className="w-[20px]" src="/imgs/home/note.png" />
              </div>
              First, check our
              <a
                href="https://status.scroll.io"
                className="ml-[4px] font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                system status
              </a>
            </dt>
            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2" />
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-base font-medium text-black flex">
              <div className="mr-[4px]">
                <img className="w-[20px]" src="/imgs/home/discord.png" />
              </div>
              Chat with us on
              <a
                href="https://discord.gg/s84eJSdFhn"
                className="ml-[4px] font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Discord
              </a>
            </dt>
            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2" />
          </div>

          <div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-base font-medium text-black flex">
              <div className="mr-[4px]">
                <img className="w-[20px]" src="/imgs/home/github.png" />
              </div>
              Open an issue or a PR
              <a
                href="https://github.com/scroll-tech"
                className="ml-[4px] font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                in our GitHub
              </a>
            </dt>
            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2" />
          </div>
        </SectionTitle>
      </div>
    </>
  );
}

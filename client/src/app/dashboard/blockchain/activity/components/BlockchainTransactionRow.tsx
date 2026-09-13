import { Log } from "@/types/log";

import { BLOCKCHAIN_METHODS } from "./blockchain.constants";

interface BlockchainTransactionRowProps {
  log: Log;
  index: number;
}

export default function BlockchainTransactionRow({
  log,
  index,
}: BlockchainTransactionRowProps) {
  const method =
    BLOCKCHAIN_METHODS[log.action] ?? "execute()";

  const blockNumber = `51829${30 - index}`;

  const age =
    log.time.split(", ")[1] ?? "Just now";

  return (
    <tr className="transition-colors hover:bg-slate-50">
      {/* Transaction Hash */}
      <td className="px-6 py-4">
        <button
          type="button"
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => {
            // Later:
            // window.open(
            //   `https://sepolia.etherscan.io/tx/${log.hash}`,
            //   "_blank"
            // );
            console.log("Transaction:", log.hash);
          }}
        >
          {log.hash}
        </button>
      </td>

      {/* Method */}
      <td className="px-6 py-4">
        <span className="rounded bg-purple-50 px-2 py-1 text-purple-700">
          {method}
        </span>
      </td>

      {/* Block */}
      <td className="px-6 py-4 text-slate-700">
        {blockNumber}
      </td>

      {/* Age */}
      <td className="px-6 py-4 text-slate-500">
        {age}
      </td>
    </tr>
  );
}
import { useSelector, shallowEqual } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'

import SelectChain from '../select/chain'
import SelectAsset from '../select/asset'
import { currency_symbol } from '../../lib/object/currency'
import { number_format, loader_color } from '../../lib/utils'

export default ({
  data,
  disabled = false,
  onSelect,
}) => {
  const { preferences, chains, assets, _pools } = useSelector(state => ({ preferences: state.preferences, chains: state.chains, assets: state.assets, _pools: state.pools }), shallowEqual)
  const { theme } = { ...preferences }
  const { chains_data } = { ...chains }
  const { assets_data } = { ...assets }
  const { pools_data } = { ..._pools }

  return (
    <div className="min-h-full border border-blue-400 dark:border-blue-800 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-blue-600 p-6">
      {pools_data || data ?
        <div className="flex flex-col space-y-8 lg:space-y-20 my-auto">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <SelectAsset
              disabled={disabled}
              value={data?.asset_data?.id}
              onSelect={a => onSelect({
                ...data,
                asset: a,
              })}
              chain={data?.chain_data?.id}
              origin=""
            />
            <div className="uppercase font-semibold">
              on
            </div>
            <SelectChain
              disabled={disabled}
              value={data?.chain_data?.id}
              onSelect={c => onSelect({
                ...data,
                chain: c,
              })}
              origin=""
            />
          </div>
          <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col space-y-0.5">
              <span className="text-slate-400 dark:text-slate-500 text-base font-semibold">
                Liquidity
              </span>
              <span className="text-lg font-bold">
                {currency_symbol}{number_format(0, '0,0.00')}
              </span>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-slate-400 dark:text-slate-500 text-base font-semibold">
                Volume (24h)
              </span>
              <span className="text-lg font-bold">
                {currency_symbol}{number_format(0, '0,0.00')}
              </span>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-slate-400 dark:text-slate-500 text-base font-semibold">
                Fees (24h)
              </span>
              <span className="text-lg font-bold">
                {currency_symbol}{number_format(0, '0,0.00')}
              </span>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-slate-400 dark:text-slate-500 text-base font-semibold">
                APY
              </span>
              <span className="text-lg font-bold">
                {number_format(0, '0,0.00')}%
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xl font-semibold">
              Your Position
            </div>
            <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col space-y-0.5">
                <span className="text-slate-400 dark:text-slate-500 text-base font-semibold">
                  Pool Share
                </span>
                <span className="text-lg font-bold">
                  {number_format(0, '0,0.00')}%
                </span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-slate-400 dark:text-slate-500 text-base font-semibold">
                  Pool Tokens
                </span>
                <span className="text-lg font-bold">
                  {number_format(0, '0,0.00')}
                </span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-slate-400 dark:text-slate-500 text-base font-semibold">
                  X
                </span>
                <span className="text-lg font-bold">
                  {number_format(0, '0,0.00')}
                </span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-slate-400 dark:text-slate-500 text-base font-semibold">
                  Y
                </span>
                <span className="text-lg font-bold">
                  {number_format(0, '0,0.00')}
                </span>
              </div>
            </div>
          </div>
        </div>
        :
        <TailSpin color={loader_color(theme)} width="36" height="36" />
      }
    </div>
  )
}
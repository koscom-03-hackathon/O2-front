import { getChangedData } from '../../data/index'
import { classNames } from '../../utils/classNames'

export const ChangeBox = ({ date }) => {
  const changedDatas = getChangedData(date)

  return (
    <div className="py-[16px] px-[32px] shadow-sm bg-white rounded-[10px] mb-[32px] space-y-2">
      {changedDatas.length !== 0 ? (
        <>
          <div className="w-full flex items-center">
            <div className="w-[80px]"></div>
            <div className="flex-1" style={{ fontFamily: 'One' }}>
              투자 종목
            </div>
            <div
              className="w-[110px] text-center"
              style={{ fontFamily: 'One' }}
            >
              체결가
            </div>
            <div className="w-[80px] text-center" style={{ fontFamily: 'One' }}>
              수량
            </div>
            <div
              className="w-[150px] text-center"
              style={{ fontFamily: 'One' }}
            >
              총 금액
            </div>
          </div>
          {changedDatas.map(({ type, kind, price, amount, totalPrice }) => (
            <div
              className={classNames(
                'w-full flex items-center py-2 border rounded-md',
                type === '매수' ? 'border-red-500' : 'border-blue-500'
              )}
              key={kind}
            >
              <div className="w-[80px] text-center">{type}</div>
              <div className="flex-1">{kind}</div>
              <div className="w-[110px] text-center">
                {price.toLocaleString()}
              </div>
              <div className="w-[80px] text-center">
                {amount.toLocaleString()}
              </div>
              <div className="w-[150px] text-center">
                {totalPrice.toLocaleString()}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div
          className="py-2 flex items-center justify-center"
          style={{ fontFamily: 'One' }}
        >
          이 날에는 매매 내역이 없습니다.
        </div>
      )}
    </div>
  )
}

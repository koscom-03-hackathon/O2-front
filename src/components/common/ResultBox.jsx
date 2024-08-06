import { getResultData } from '../../data/index'
import { classNames } from '../../utils/classNames'

export const ResultBox = ({ target, now }) => {
  const resultDatas = getResultData(target, now)

  return (
    <div className="py-[16px] px-[32px] shadow-sm bg-white rounded-[10px] mb-[32px] space-y-2">
      {resultDatas.length !== 0 ? (
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
              기존 수량
            </div>
            <div
              className="w-[110px] text-center"
              style={{ fontFamily: 'One' }}
            >
              기존 체결가
            </div>
            <div className="w-[80px] text-center" style={{ fontFamily: 'One' }}>
              현재 시세
            </div>
            <div
              className="w-[150px] text-center"
              style={{ fontFamily: 'One' }}
            >
              총 금액 변동
            </div>
          </div>
          {resultDatas.map(
            ({ type, kind, amount, before_price, now_price, changed }) => (
              <div
                className={classNames(
                  'w-full flex items-center py-2 border rounded-md',
                  type === '매수' ? 'border-red-500' : 'border-blue-500'
                )}
                key={kind}
              >
                <div className="w-[80px] text-center">{type}</div>
                <div className="flex-1">{kind}</div>
                <div className="w-[110px] text-center">{amount}</div>
                <div className="w-[110px] text-center">{before_price}</div>
                <div className="w-[80px] text-center">{now_price}</div>
                <div className="w-[150px] text-center">{changed}</div>
              </div>
            )
          )}
        </>
      ) : (
        <div
          className="py-2 flex items-center justify-center"
          style={{ fontFamily: 'One' }}
        >
          해당 전략에선 매매 내역이 없었습니다.
        </div>
      )}
    </div>
  )
}

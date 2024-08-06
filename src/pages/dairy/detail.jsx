import { RootLayout } from '../../components/RootLayout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { classNames } from '../../utils/classNames'
import TransitionsModal from '../../components/common/Modal'
import { useState } from 'react'

const mockData = {
  type: '투자전략',
  title: 'QQQ 롱, 국장 숏',
  date: '2024.07.03',
  content:
    'QQQ는 미 대선 이슈로 국장 대비 아웃퍼폼할 것이라고 생각함.\n 그리고 전반적으로 주식 시장이 상승할 것이라고 생각해서 기존에 헷징했던 코스피 200 선물을 매도함.',
  meta: [
    {
      type: '매수',
      kind: 'QQQ',
      price: 20000,
      amount: 100,
      totalPrice: 2000000,
      RoR: 8,
    },
    {
      type: '매도',
      kind: '코스피200 선물 인버스 x2',
      price: 2000,
      amount: 1000,
      totalPrice: 2000000,
      RoR: -8,
    },
  ],
}

// const mockData2 = {
//   type: '전략피드백',
//   title: '헷징은 필수다.',
//   date: '2024.07.05',
//   content:
//     '헷징을 안하면 안되는구나... 주식 시장이 괜찮아보인다고 헷징을 풀면 하락장에서 골로 간다는걸 배웠음',
//   meta: [
//     {
//       type: '매수',
//       kind: 'QQQ',
//       before_price: 20000,
//       now_price: 18000,
//       changed: -200000,
//     },
//     {
//       type: '매도',
//       kind: '코스피200 선물 인버스 x2',
//       before_price: 2000,
//       now_price: 4000,
//       changed: -200000,
//     },
//   ],
// }

export const DetailPage = () => {
  const { type, title, date, content, meta } = mockData

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  return (
    <RootLayout>
      <Header title={title} date={date} type={type} onOpen={onOpen} />
      {/* 내용물 구현 */}
      <div className="m-auto w-[788px] pt-[48px]">
        {type === '투자전략' ? (
          <Strategy content={content} meta={meta} />
        ) : type === '전략피드백' ? (
          <FeedBack content={content} meta={meta} />
        ) : (
          <Free content={content} />
        )}
      </div>
      <DeleteModal open={open} onClose={onClose} />
    </RootLayout>
  )
}

const Header = ({ title, date, type, onOpen }) => {
  const navigate = useNavigate()

  return (
    <header className="h-[68px] flex items-center justify-center border-b border-[#D3D3D3]">
      <div className="w-full max-w-[1020px] px-10 flex items-center justify-center">
        <ArrowBackIcon
          sx={{ fontSize: '28px', cursor: 'pointer' }}
          onClick={() => {
            navigate(-1)
          }}
        />
        <h1 className="mx-10 text-[24px] text-[#121212] font-bold">{title}</h1>
        <div className="border border-black rounded-[5px] w-[88px] h-[36px] flex items-center justify-center">
          <span className="text-[#121212] text-[14px]">{type}</span>
        </div>
        <div className="flex-1 ml-4 text-[18px] text-[#121212]">{date}</div>
        <EditIcon
          className="mr-4"
          sx={{ fontSize: '30px', cursor: 'pointer' }}
        />
        <DeleteIcon
          fontSize="medium"
          sx={{ fontSize: '30px', cursor: 'pointer' }}
          onClick={() => onOpen()}
        />
      </div>
    </header>
  )
}

const Strategy = ({ meta, content }) => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  return (
    <>
      <Title>매매 현황</Title>
      <div className="py-[16px] px-[32px] shadow-sm bg-white rounded-[10px] mb-[32px] space-y-2">
        <div className="w-full flex items-center">
          <div className="w-[80px]"></div>
          <div className="flex-1">투자 종목</div>
          <div className="w-[110px] text-center">호가</div>
          <div className="w-[80px] text-center">수량</div>
          <div className="w-[150px] text-center">총 금액</div>
          <div className="w-[60px] text-center">수익률</div>
        </div>
        {meta.map(({ type, kind, price, amount, totalPrice, RoR }) => (
          <div
            className={classNames(
              'w-full flex items-center py-2 border rounded-md',
              type === '매수' ? 'border-red-500' : 'border-blue-500'
            )}
            key={kind}
          >
            <div className="w-[80px] text-center">{type}</div>
            <div className="flex-1">{kind}</div>
            <div className="w-[110px] text-center">{price}</div>
            <div className="w-[80px] text-center">{amount}</div>
            <div className="w-[150px] text-center">{totalPrice}</div>
            <div className="w-[60px] text-center">{RoR}</div>
          </div>
        ))}
      </div>
      <Title>투자 전략 및 근거</Title>
      <Content>{content}</Content>
      <Button onClick={() => onOpen()}>AI에게 투자 전략 조언 받기</Button>
      <ResearchModal open={open} onClose={onClose} />
    </>
  )
}

const FeedBack = ({ meta, content }) => {
  return (
    <>
      <Title>매매 결과</Title>
      <div className="py-[16px] px-[32px] shadow-sm bg-white rounded-[10px] mb-[32px] space-y-2">
        <div className="w-full flex items-center">
          <div className="w-[80px]"></div>
          <div className="flex-1">투자 종목</div>
          <div className="w-[110px] text-center">기존 호가</div>
          <div className="w-[80px] text-center">현재 호가</div>
          <div className="w-[150px] text-center">총 금액 변동</div>
        </div>
        {meta.map(({ type, kind, before_price, now_price, changed }) => (
          <div
            className={classNames(
              'w-full flex items-center py-2 border rounded-md',
              type === '매수' ? 'border-red-500' : 'border-blue-500'
            )}
            key={kind}
          >
            <div className="w-[80px] text-center">{type}</div>
            <div className="flex-1">{kind}</div>
            <div className="w-[110px] text-center">{before_price}</div>
            <div className="w-[80px] text-center">{now_price}</div>
            <div className="w-[150px] text-center">{changed}</div>
          </div>
        ))}
      </div>
      <Title>투자 피드백</Title>
      <Content>{content}</Content>
    </>
  )
}

const Free = ({ content }) => {
  return (
    <>
      <Title>내용</Title>
      <Content>{content}</Content>
    </>
  )
}

const Title = ({ children }) => {
  return (
    <div className="mb-3">
      <h2 className={classNames('text-[24px] font-bold text-[#121212]')}>
        {children}
      </h2>
      <span className="relative top-[-3px] block w-11 h-1 bg-[#EB6D1D]"></span>
    </div>
  )
}

const Content = ({ children }) => {
  return (
    <div className="min-h-[130px] pt-[28px] px-[32px] shadow-sm bg-white rounded-[10px] whitespace-pre-wrap mb-[16px]">
      {children}
    </div>
  )
}

const Button = ({ children, onClick }) => {
  return (
    <button
      className="h-[44px] w-[259px] bg-white rounded-[10px] border border-[#ED6D1D] flex items-center justify-center text-[#ED6D1D]"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const ResearchModal = ({ open, onClose }) => {
  return (
    <TransitionsModal open={open} onClose={onClose}>
      <div className="py-8 px-8 w-[500px] bg-white rounded-lg flex flex-col items-center">
        <h3 className="text-[22px] text-[#121212] pb-4">
          투자 전략 AI 분석 결과
        </h3>

        <p className="text-[#343434] text-[16px] pb-6 px-6">
          우선 투자 근거의 경우, 대선을 판단 근거로 삼는 투자는 꽤 위험한 투자가
          될 수 있습니다. 투자 전략의 경우 나스닥을 롱을 헷징하기 위해서 코스피
          숏을 잡았는데 이머징 마켓이 강해질 경우에 헷징 효과가 감소될 수
          있습니다. 좀 더 안전한 헷징 방법을 강구하시는 걸 추천드립니다!
        </p>

        <button
          className="w-[108px] h-[36px] border border-[#121212] rounded-lg bg-white flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <span className="ml-1 text-[#121212]">닫기</span>
        </button>
      </div>
    </TransitionsModal>
  )
}

const DeleteModal = ({ open, onClose }) => {
  return (
    <TransitionsModal open={open} onClose={onClose}>
      <div className="py-8 px-8 w-[500px] bg-white rounded-lg flex flex-col items-center">
        <h3 className="text-[22px] text-[#121212] pb-4">
          일기를 삭제하시겠습니까?
        </h3>

        <p className="text-[#343434] text-[16px] pb-6">
          한번 삭제하시면 복구가 어렵습니다. <br />
          기존 AI 분석 결과가 모두 사라집니다
        </p>

        <div className="flex items-center justify-center space-x-4">
          <button
            className="w-[108px] h-[36px] border border-[#121212] rounded-lg bg-white flex items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            <span className="ml-1 text-[#121212]">닫기</span>
          </button>
          <button
            className="w-[108px] h-[36px] border border-[#ED6D1D] rounded-lg bg-white flex items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            <span className="ml-1 text-[#ED6D1D]">삭제</span>
          </button>
        </div>
      </div>
    </TransitionsModal>
  )
}

import { RootLayout } from '../../components/RootLayout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTypeText } from '../../utils/getTypeText'
import { Edit } from '../../components/common/Edit'

const mockData = {
  type: 'strategy',
  title: 'QQQ 롱, 국장 숏',
  date: '2024.07.03',
  strategy:
    '전반적으로 주식 시장이 상승할 것이라고 생각해서 기존에 헷징했던 코스피 200 선물을 매도함.',
  reasoning: 'QQQ는 미 대선 이슈로 국장 대비 아웃퍼폼할 것이라고 생각함.',
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

export const EditPage = () => {
  const { diaryId } = useParams()

  // 데이터 불러오기...

  return (
    <RootLayout>
      <Header type={mockData.type} />
      <Content data={mockData} />
    </RootLayout>
  )
}

const Header = ({ type }) => {
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
        <h1 className="mx-10 text-[24px] text-[#121212] font-bold">
          기존 일기 수정
        </h1>
        <div className="border border-black rounded-[5px] w-[88px] h-[36px] flex items-center justify-center">
          <span className="text-[#121212] text-[14px]">
            {getTypeText(type)}
          </span>
        </div>
        <div className="flex-1"></div>
      </div>
    </header>
  )
}

const Content = ({ data: beforeData }) => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const [data, setData] = useState({
    date: beforeData.date,
    title: beforeData.title,
    content: beforeData.content,
    type: beforeData.type,
    strategy: beforeData.strategy,
    reasoning: beforeData.reasoning,
    feedback: beforeData.feedback,
  })

  const onSubmit = () => {
    onOpen()
  }

  return (
    <Edit
      data={data}
      setData={setData}
      onSubmit={onSubmit}
      open={open}
      onClose={onClose}
    />
  )
}

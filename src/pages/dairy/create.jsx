import { RootLayout } from '../../components/RootLayout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Edit } from '../../components/common/Edit'

export const CreatePage = () => {
  const { type } = useParams()

  return (
    <RootLayout>
      <Header type={type} />
      <Content type={type} />
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
          새 일기 생성
        </h1>
        <div className="border border-black rounded-[5px] w-[88px] h-[36px] flex items-center justify-center">
          <span className="text-[#121212] text-[14px]">
            {type === 'strategy'
              ? '투자전략'
              : type === 'feedback'
                ? '전략피드백'
                : '자유양식'}
          </span>
        </div>
        <div className="flex-1"></div>
      </div>
    </header>
  )
}

const Content = ({ type }) => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const [data, setData] = useState({
    date: '2024-07-05',
    title: '',
    content: '',
    type,
    strategy: '',
    reasoning: '',
    feedback: '',
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

import { RootLayout } from '../../components/RootLayout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTypeText } from '../../utils/getTypeText'
import { Edit } from '../../components/common/Edit'
import { useQuery } from '@tanstack/react-query'
import { getDiaryDetail, updateDiary } from '../../apis/index'

export const EditPage = () => {
  const { diaryId } = useParams()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['diary', diaryId],
    queryFn: () => getDiaryDetail(diaryId),
  })

  // 데이터 불러오기...

  return (
    <RootLayout>
      {!isLoading ? (
        <>
          <Header type={data.type} />
          <Content data={data} refetch={refetch} />
        </>
      ) : (
        <></>
      )}
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

const Content = ({ data: beforeData, refetch }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
    navigate(-1, { replace: true })
  }
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

  const onSubmit = async () => {
    await updateDiary(data)
    await refetch()
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

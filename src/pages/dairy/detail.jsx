import { RootLayout } from '../../components/RootLayout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { classNames } from '../../utils/classNames'
import TransitionsModal from '../../components/common/Modal'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getDiaryDetail,
  getAIFeedback,
  getAIStrategy,
  deleteDiary,
} from '../../apis/index'
import { getTypeText } from '../../utils/getTypeText'
import Chip from '@mui/material/Chip'
import { ChangeBox } from '../../components/common/ChangeBox'
import { ResultBox } from '../../components/common/ResultBox'

export const DetailPage = () => {
  const { diaryId } = useParams()

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const { data, isLoading } = useQuery({
    queryKey: ['diary', diaryId],
    queryFn: () => getDiaryDetail(diaryId),
  })

  if (isLoading) {
    return <RootLayout />
  }
  const { type, title, date } = data

  return (
    <RootLayout>
      <Header title={title} date={date} type={type} onOpen={onOpen} />
      {/* 내용물 구현 */}
      <div className="m-auto w-[788px] py-[48px]">
        {type === 'strategy' ? (
          <Strategy data={data} />
        ) : type === 'feedback' ? (
          <FeedBack data={data} />
        ) : (
          <Free data={data} />
        )}
      </div>

      <DeleteModal open={open} onClose={onClose} />
    </RootLayout>
  )
}

const Header = ({ title, date, type, onOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()

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
          <span className="text-[#121212] text-[14px]">
            {getTypeText(type)}
          </span>
        </div>
        <div className="flex-1 ml-4 text-[18px] text-[#121212]">{date}</div>
        <EditIcon
          className="mr-4"
          sx={{ fontSize: '30px', cursor: 'pointer' }}
          onClick={() => {
            navigate(location.pathname + '/edit')
          }}
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

const Strategy = ({ data }) => {
  const { diaryId } = useParams()

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const { data: feedback } = useQuery({
    queryKey: ['diary', 'AI', diaryId, 'strategy'],
    queryFn: () => getAIStrategy(),
  })

  return (
    <>
      <Title>매매 현황</Title>
      <ChangeBox date={data.date} />
      <Title>투자 전략</Title>
      <Content>{data.strategy}</Content>
      <Title>투자 근거</Title>
      <Content>{data.reasoning}</Content>
      <Button onClick={() => onOpen()}>AI에게 투자 전략 조언 받기</Button>
      <ResearchModal
        open={open}
        onClose={onClose}
        content={feedback}
        type="strategy"
      />
    </>
  )
}

const FeedBack = ({ data }) => {
  const { diaryId } = useParams()

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const { data: feedback } = useQuery({
    queryKey: ['diary', 'AI', diaryId, 'feedback'],
    queryFn: () => getAIFeedback(),
  })

  return (
    <>
      <Title>매매 결과</Title>
      <ResultBox target="2024-07-11" now={data.date}></ResultBox>
      <Title>투자 피드백</Title>
      <Content>{data.feedback}</Content>
      <Button onClick={() => onOpen()}>AI에게 피드백 받아보기</Button>
      <ResearchModal
        open={open}
        onClose={onClose}
        content={feedback}
        type="feedback"
      />
    </>
  )
}

const Free = ({ data }) => {
  return (
    <>
      <Title>내용</Title>
      <Content>{data.content}</Content>
    </>
  )
}

const Title = ({ children }) => {
  return (
    <div className="mb-3">
      <h2 className={classNames('text-[22px] font-bold text-[#121212]')}>
        {children}
      </h2>
      <span className="relative top-[-1px] block w-11 h-1 bg-[#EB6D1D]"></span>
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

const ResearchModal = ({ open, onClose, content, type }) => {
  return (
    <TransitionsModal open={open} onClose={onClose}>
      <div className="py-8 px-8 w-[800px] bg-white rounded-lg flex flex-col items-center">
        <h3 className="text-[22px] text-[#121212] pb-4" fontFamily="One">
          {type === 'strategy'
            ? '투자 전략 AI 분석 결과'
            : 'AI 피드백 받아보기'}
        </h3>

        <p className="text-[#343434] text-[16px]">
          {content ? (
            <RefineAIFeedback>{content.response}</RefineAIFeedback>
          ) : (
            <div className="flex flex-col items-center">
              <img src="/img/loading.gif" width="100px" alt="loading" />
              <p className="items-center"> 로딩중...</p>
            </div>
          )}
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
  const { diaryId } = useParams()
  const navigate = useNavigate()

  const onDelete = async () => {
    await deleteDiary(diaryId)
    onClose()
    navigate(-1, { replace: true })
  }

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
            onClick={onDelete}
          >
            <span className="ml-1 text-[#ED6D1D]">삭제</span>
          </button>
        </div>
      </div>
    </TransitionsModal>
  )
}

const RefineAIFeedback = ({ children }) => {
  const content = children.split('\n')
  const sections = []
  let currentSection = null

  content.forEach((line) => {
    line = line.trimStart()
    if (line.startsWith('### ')) {
      if (currentSection) {
        sections.push(currentSection)
      }
      currentSection = {
        title: line.trimStart().replace('### ', ''),
        content: [],
      }
    } else if (currentSection) {
      // line = line.replace(/\#\#\#/g, '');
      currentSection.content.push(line.replace(/\*\*/g, ''))
    }
  })

  if (currentSection) {
    sections.push(currentSection)
  }

  return (
    <div className="min-h-[130px] shadow-sm bg-white rounded-[10px] whitespace-pre-wrap mb-[16px] max-h-[300px] overflow-scroll">
      {sections.map((section, index) => (
        <div key={index} style={{ padding: 10 }}>
          <Chip label={section.title} color="primary" />
          <p style={{ margin: 5 }}>{section.content.join('\n')}</p>
        </div>
      ))}
    </div>
  )
}

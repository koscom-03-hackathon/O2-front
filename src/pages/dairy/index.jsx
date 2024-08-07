import { RootLayout } from '../../components/RootLayout'
import AddIcon from '@mui/icons-material/Add'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TransitionsModal from '../../components/common/Modal'
import BallotIcon from '@mui/icons-material/Ballot'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CommentIcon from '@mui/icons-material/Comment'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { getDiaryList } from '../../apis/index'
import { getTypeText } from '../../utils/getTypeText'

export default function IndexPage() {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  // 현재 날짜를 YYYY-MM 형식으로 초기화
  const [date, setDate] = useState(dayjs().format('YYYY-MM'))

  // 한 달 더하는 함수
  const addMonth = () => {
    setDate((prevDate) => dayjs(prevDate).add(1, 'month').format('YYYY-MM'))
  }

  // 한 달 빼는 함수
  const subtractMonth = () => {
    setDate((prevDate) =>
      dayjs(prevDate).subtract(1, 'month').format('YYYY-MM')
    )
  }

  const { data, isLoading } = useQuery({
    queryKey: ['diaries', date],
    queryFn: () => getDiaryList(date),
  })

  return (
    <RootLayout>
      <Header />
      <div className="m-auto w-[788px] pt-[48px]">
        {/* 리스트 정보 불러오기 부분 */}
        <div className="flex items-center justify-between">
          {/* 월 선택 뷰 */}
          <div className="flex justify-between items-center w-[180px]">
            <ChevronLeftIcon
              onClick={subtractMonth}
              sx={{ cursor: 'pointer' }}
            />
            <span className="text-[#121212] text-[24px] font-bold">{date}</span>
            <ChevronRightIcon onClick={addMonth} sx={{ cursor: 'pointer' }} />
          </div>
          {/* 새 일기 생성 버튼 */}
          <button
            className="w-[122px] h-[44px] border border-[#121212] rounded-lg bg-white flex items-center justify-center"
            onClick={() => setOpen(true)}
          >
            <AddIcon></AddIcon>
            <span className="ml-1 text-[#121212]">새 일기</span>
          </button>
        </div>

        {/* 리스트 내용물*/}
        <div className="py-[10px] space-y-[14px] flex flex-col w-full">
          {!isLoading &&
            data
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(({ id, date, title, type, content, strategy, feedback }) => (
                <ListCard
                  key={id}
                  id={id}
                  date={date}
                  title={title}
                  content={strategy || feedback || content || ''}
                  type={type}
                ></ListCard>
              ))}
        </div>
        <CreateDiaryModal open={open} onClose={onClose}></CreateDiaryModal>
      </div>
    </RootLayout>
  )
}

const Header = () => {
  return (
    <header className="h-[68px] flex items-center justify-center border-b border-[#D3D3D3]">
      <h1
        className="text-[30px] text-[#ED6D1D] font"
        style={{ fontFamily: 'Jalnan' }}
      >
        O2 - 오늘의 투자일기
      </h1>
    </header>
  )
}

const ListCard = ({ id, date, title, content, type }) => {
  const navigate = useNavigate()

  return (
    <div
      className="pt-[16px] px-[22px] bg-white rounded-[10px] h-[140px] relative shadow-sm cursor-pointer"
      onClick={() => {
        navigate(`/diary/${id}`)
      }}
    >
      <span className="text-[14px] text-[#454545]">{date}</span>
      <h2 className="text-[20px] text-[#121212] font-bold">{title}</h2>
      <div className="pt-[10px] text[#2B2B2B]">{content}</div>
      <div className="absolute top-4 right-5 border border-black rounded-[5px] w-[84px] h-[32px] flex items-center justify-center">
        <span className="text-[#121212] text-[12px]">{getTypeText(type)}</span>
      </div>
    </div>
  )
}

const CreateDiaryModal = ({ open, onClose }) => {
  const navigate = useNavigate()

  const MoveNewDiary = (type) => {
    if (type === '투자전략') {
      navigate('/diary/new/strategy')
    } else if (type === '전략피드백') {
      navigate('/diary/new/feedback')
    } else {
      navigate('/diary/new/free')
    }
    onClose()
  }

  return (
    <TransitionsModal open={open} onClose={onClose}>
      <div className="py-8 px-8 w-[500px] bg-white rounded-lg flex flex-col items-center">
        <h3 className="text-[22px] text-[#121212] pb-4">
          생성할 일기 종류를 선택하세요!
        </h3>

        <div className="space-x-2 p-2 flex items-center justify-center pb-6">
          <div
            className="w-[120px] h-[120px] border border-[#ED6D1D] rounded-lg flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              MoveNewDiary('투자전략')
            }}
          >
            <BallotIcon sx={{ fontSize: '30px', color: '#ED6D1D' }} />
            <span className="text-[18px] text-[#454545] mt-4">투자전략</span>
          </div>
          <div
            className="w-[120px] h-[120px] border border-[#ED6D1D] rounded-lg flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              MoveNewDiary('전략피드백')
            }}
          >
            <BorderColorIcon sx={{ fontSize: '30px', color: '#ED6D1D' }} />
            <span className="text-[18px] text-[#454545] mt-4">전략피드백</span>
          </div>
          <div
            className="w-[120px] h-[120px] border border-[#ED6D1D] rounded-lg flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              MoveNewDiary('자유양식')
            }}
          >
            <CommentIcon sx={{ fontSize: '30px', color: '#ED6D1D' }} />
            <span className="text-[18px] text-[#454545] mt-4">자유양식</span>
          </div>
        </div>

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

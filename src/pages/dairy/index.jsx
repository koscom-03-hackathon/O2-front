import { RootLayout } from '../../components/RootLayout'
import AddIcon from '@mui/icons-material/Add'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useNavigate } from 'react-router-dom'

export default function IndexPage() {
  return (
    <RootLayout>
      <Header />
      <div className="m-auto w-[788px] pt-[48px]">
        {/* 리스트 정보 불러오기 부분 */}
        <div className="flex items-center justify-between">
          {/* 월 선택 뷰 */}
          <div className="flex items-center">
            <span className="text-[#121212] text-[24px] font-bold mr-[14px]">
              2024.07
            </span>
            <CalendarMonthIcon />
          </div>
          {/* 새 일기 생성 버튼 */}
          <button className="w-[122px] h-[44px] border border-[#121212] rounded-lg bg-white flex items-center justify-center">
            <AddIcon></AddIcon>
            <span className="ml-1 text-[#121212]">새 일기</span>
          </button>
        </div>

        {/* 리스트 내용물*/}
        <div className="py-[10px] space-y-[14px] flex flex-col w-full">
          <ListCard
            date="2024.07.03"
            title="QQQ 롱, 국장 숏"
            content="나스닥이 상승할지는 모르겠지만, 적어도 국장보다는 나을 것 같아 이런 포지션을 잡았다. "
            type="투자전략"
          ></ListCard>
          <ListCard
            date="2024.07.03"
            title="QQQ 롱, 국장 숏"
            content="나스닥이 상승할지는 모르겠지만, 적어도 국장보다는 나을 것 같아 이런 포지션을 잡았다. "
            type="투자전략"
          ></ListCard>
          <ListCard
            date="2024.07.03"
            title="QQQ 롱, 국장 숏"
            content="나스닥이 상승할지는 모르겠지만, 적어도 국장보다는 나을 것 같아 이런 포지션을 잡았다. "
            type="투자전략"
          ></ListCard>
        </div>
      </div>
    </RootLayout>
  )
}

const Header = () => {
  return (
    <header className="h-[68px] flex items-center justify-center border-b border-[#D3D3D3]">
      <h1 className="text-[24px] text-[#ED6D1D] font-bold">
        O2 - 오늘의 투자일기
      </h1>
    </header>
  )
}

const ListCard = ({ date, title, content, type }) => {
  const navigate = useNavigate()

  return (
    <div
      className="pt-[16px] px-[22px] bg-white rounded-[10px] h-[140px] relative shadow-sm cursor-pointer"
      onClick={() => {
        navigate('/diary/test')
      }}
    >
      <span className="text-[14px] text-[#454545]">{date}</span>
      <h2 className="text-[20px] text-[#121212] font-bold">{title}</h2>
      <div className="pt-[10px] text[#2B2B2B]">{content}</div>
      <div className="absolute top-4 right-5 border border-black rounded-[5px] w-[84px] h-[32px] flex items-center justify-center">
        <span className="text-[#121212] text-[12px]">{type}</span>
      </div>
    </div>
  )
}

import TransitionsModal from '../../components/common/Modal'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { ChangeBox } from './ChangeBox'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDiaryList } from '../../apis/index'
import { getTypeText } from '../../utils/getTypeText'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ResultBox } from './ResultBox'

export const Edit = ({ data, setData, onSubmit, open, onClose, type }) => {
  return (
    <div className="m-auto w-[788px] py-[48px]">
      {data.type === 'strategy' ? (
        <Strategy
          data={data}
          setData={setData}
          onSubmit={onSubmit}
          type={type}
        />
      ) : data.type === 'feedback' ? (
        <FeedBack
          data={data}
          setData={setData}
          onSubmit={onSubmit}
          type={type}
        />
      ) : (
        <Free data={data} setData={setData} onSubmit={onSubmit} type={type} />
      )}
      <ConfirmModal open={open} onClose={onClose} type={type} />
    </div>
  )
}

const Strategy = ({ data, setData, onSubmit, type }) => {
  return (
    <div className="space-y-4">
      <div>
        <DatePicker
          defaultValue={dayjs(data.date)}
          sx={{
            color: '#343434',
            backgroundColor: '#FFFFFF',
          }}
          onChange={(newDate) => {
            setData((data) => ({
              ...data,
              date: dayjs(newDate).format('YYYY-MM-DD'),
            }))
          }}
        />
      </div>
      <div>
        <Title>제목</Title>
        <input
          value={data.title}
          onChange={(e) =>
            setData((data) => ({ ...data, title: e.target.value }))
          }
          className="py-1.5 px-3 border border-[#898989] text-base bg-white w-full rounded-lg text-[#343434] outline-neutral-400"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div>
        <Title>매매현황</Title>
        <ChangeBox date={data.date} />
      </div>
      <div>
        <Title>투자전략</Title>
        <textarea
          value={data.strategy}
          onChange={(e) =>
            setData((data) => ({ ...data, strategy: e.target.value }))
          }
          className="py-2 px-3 border border-[#898989] text-base bg-white w-full rounded-lg resize-none text-[#343434] h-[90px] outline-neutral-400"
          placeholder="투자 전략을 입력하세요"
        />
      </div>
      <div>
        <Title>투자근거</Title>
        <textarea
          value={data.reasoning}
          onChange={(e) =>
            setData((data) => ({ ...data, reasoning: e.target.value }))
          }
          className="py-2 px-3 border border-[#898989] text-base bg-white w-full rounded-lg resize-none text-[#343434] h-[90px] outline-neutral-400"
          placeholder="투자 근거를 입력하세요"
        />
      </div>
      <Button onClick={onSubmit}>
        {type === 'create' ? '생성하기' : '수정하기'}
      </Button>
    </div>
  )
}

const FeedBack = ({ data, setData, onSubmit, type }) => {
  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState(null)

  return (
    <div className="space-y-4">
      <div>
        <DatePicker
          defaultValue={dayjs(data.date)}
          sx={{
            color: '#343434',
            backgroundColor: '#FFFFFF',
          }}
          onChange={(newDate) => {
            setData((data) => ({
              ...data,
              date: dayjs(newDate).format('YYYY-MM-DD'),
            }))
          }}
        />
      </div>
      <div>
        <Title>평가할 투자전략</Title>
        <div className="flex justify-start items-center">
          <span className="mr-2 min-w-[200px]">
            {target ? target.title : '선택한 투자전략이 없습니다.'}
          </span>
          <button
            className="w-[108px] h-[36px] border border-[#121212] rounded-lg bg-white flex items-center justify-center cursor-pointer"
            onClick={() => setOpen(true)}
          >
            선택하기
          </button>
        </div>
      </div>
      <div>
        <Title>제목</Title>
        <input
          value={data.title}
          onChange={(e) =>
            setData((data) => ({ ...data, title: e.target.value }))
          }
          className="py-1.5 px-3 border border-[#898989] text-base bg-white w-full rounded-lg text-[#343434] outline-neutral-400"
          placeholder="제목을 입력하세요"
        />
      </div>
      {target && (
        <div>
          <Title>매매결과</Title>
          <ResultBox target={target.date} now={data.date} />
        </div>
      )}
      <div>
        <Title>투자 피드백</Title>
        <textarea
          value={data.feedback}
          onChange={(e) =>
            setData((data) => ({ ...data, feedback: e.target.value }))
          }
          className="py-2 px-3 border border-[#898989] text-base bg-white w-full rounded-lg resize-none text-[#343434] h-[90px] outline-neutral-400"
          placeholder="투자 피드백을 입력하세요"
        />
      </div>
      <Button onClick={onSubmit}>
        {type === 'create' ? '생성하기' : '수정하기'}
      </Button>
      <SelectStrategyModal
        open={open}
        onClose={() => setOpen(false)}
        setTarget={setTarget}
      ></SelectStrategyModal>
    </div>
  )
}

const Free = ({ data, setData, onSubmit, type }) => {
  return (
    <div className="space-y-4">
      <div>
        <DatePicker
          defaultValue={dayjs(data.date)}
          sx={{
            color: '#343434',
            backgroundColor: '#FFFFFF',
          }}
          onChange={(newDate) => {
            setData((data) => ({
              ...data,
              date: dayjs(newDate).format('YYYY-MM-DD'),
            }))
          }}
        />
      </div>
      <div>
        <Title>제목</Title>
        <input
          value={data.title}
          onChange={(e) =>
            setData((data) => ({ ...data, title: e.target.value }))
          }
          className="py-1.5 px-3 border border-[#898989] text-base bg-white w-full rounded-lg text-[#343434] outline-neutral-400"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div>
        <Title>내용</Title>
        <textarea
          value={data.content}
          onChange={(e) =>
            setData((data) => ({ ...data, content: e.target.value }))
          }
          className="py-2 px-3 border border-[#898989] text-base bg-white w-full rounded-lg resize-none text-[#343434] h-[90px] outline-neutral-400"
          placeholder="내용을 입력하세요"
        />
      </div>
      <Button onClick={onSubmit}>
        {type === 'create' ? '생성하기' : '수정하기'}
      </Button>
    </div>
  )
}

const Title = ({ children }) => {
  return (
    <div className="mb-2">
      <h2 className="text-[22px] font-bold text-[#121212]">{children}</h2>
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

const ConfirmModal = ({ open, onClose, type }) => {
  return (
    <TransitionsModal open={open} onClose={onClose}>
      <div className="py-8 px-8 w-[500px] bg-white rounded-lg flex flex-col items-center">
        <h3 className="text-[22px] text-[#121212] pb-4">
          {type === 'create'
            ? '일기가 생성되었습니다'
            : '일기가 수정되었습니다!'}
        </h3>

        <button
          className="w-[108px] h-[36px] border border-[#ED6D1D] rounded-lg bg-white flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <span className="ml-1 text-[#ED6D1D]">확인</span>
        </button>
      </div>
    </TransitionsModal>
  )
}

const SelectStrategyModal = ({ open, onClose, setTarget }) => {
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

  const onTargetClick = (data) => {
    setTarget(data)
    onClose()
  }

  return (
    <TransitionsModal open={open} onClose={onClose}>
      <div className="py-8 px-8 w-[500px] bg-white rounded-lg flex flex-col items-center">
        <h3 className="text-[22px] text-[#121212] pb-4">투자전략 선택하기</h3>
        <div className="flex justify-left items-center w-full">
          <ChevronLeftIcon onClick={subtractMonth} sx={{ cursor: 'pointer' }} />
          <span className="text-[#121212] text-[18px]">{date}</span>
          <ChevronRightIcon onClick={addMonth} sx={{ cursor: 'pointer' }} />
        </div>
        <div className="py-[10px] space-y-[14px] flex flex-col w-full">
          {!isLoading &&
            data
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .filter(({ type }) => type === 'strategy')
              .map(({ id, date, title, type }) => (
                <ListCard
                  key={id}
                  id={id}
                  date={date}
                  title={title}
                  type={type}
                  onClick={onTargetClick}
                ></ListCard>
              ))}
        </div>
      </div>
    </TransitionsModal>
  )
}

const ListCard = ({ id, date, title, type, onClick }) => {
  return (
    <div
      className="pt-[8px] px-[22px] bg-white rounded-[10px] h-[80px] relative border border-gray-300 cursor-pointer"
      onClick={() => onClick({ id, title, date })}
    >
      <span className="text-[14px] text-[#454545]">{date}</span>
      <h2 className="text-[20px] text-[#121212] font-bold">{title}</h2>
      <div className="absolute top-4 right-5 border border-black rounded-[5px] w-[84px] h-[32px] flex items-center justify-center">
        <span className="text-[#121212] text-[12px]">{getTypeText(type)}</span>
      </div>
    </div>
  )
}

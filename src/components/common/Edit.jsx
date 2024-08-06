import TransitionsModal from '../../components/common/Modal'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'

export const Edit = ({ data, setData, onSubmit, open, onClose }) => {
  return (
    <div className="m-auto w-[788px] pt-[48px]">
      {data.type === 'strategy' ? (
        <Strategy data={data} setData={setData} onSubmit={onSubmit} />
      ) : data.type === 'feedback' ? (
        <FeedBack data={data} setData={setData} onSubmit={onSubmit} />
      ) : (
        <Free data={data} setData={setData} onSubmit={onSubmit} />
      )}
      <ConfirmModal open={open} onClose={onClose} />
    </div>
  )
}

const Strategy = ({ data, setData, onSubmit }) => {
  return (
    <div className="space-y-4">
      <div>
        <DatePicker
          defaultValue={dayjs(data.date)}
          sx={{
            color: '#343434',
            backgroundColor: '#FFFFFF',
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
      <Button onClick={onSubmit}>수정하기</Button>
    </div>
  )
}

const FeedBack = ({ data, setData, onSubmit }) => {
  return (
    <div className="space-y-4">
      <div>
        <DatePicker
          defaultValue={dayjs(data.date)}
          sx={{
            color: '#343434',
            backgroundColor: '#FFFFFF',
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
      <Button onClick={onSubmit}>수정하기</Button>
    </div>
  )
}

const Free = ({ data, setData, onSubmit }) => {
  return (
    <div className="space-y-4">
      <div>
        <DatePicker
          defaultValue={dayjs(data.date)}
          sx={{
            color: '#343434',
            backgroundColor: '#FFFFFF',
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
          value={data.feedback}
          onChange={(e) =>
            setData((data) => ({ ...data, feedback: e.target.value }))
          }
          className="py-2 px-3 border border-[#898989] text-base bg-white w-full rounded-lg resize-none text-[#343434] h-[90px] outline-neutral-400"
          placeholder="내용을 입력하세요"
        />
      </div>
      <Button onClick={onSubmit}>수정하기</Button>
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

const ConfirmModal = ({ open, onClose }) => {
  return (
    <TransitionsModal open={open} onClose={onClose}>
      <div className="py-8 px-8 w-[500px] bg-white rounded-lg flex flex-col items-center">
        <h3 className="text-[22px] text-[#121212] pb-4">
          일기가 수정되었습니다!
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

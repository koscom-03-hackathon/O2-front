import ArticleIcon from '@mui/icons-material/Article'
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline'
import { useNavigate, useLocation } from 'react-router-dom'
import { classNames } from '../utils/classNames'

export const RootLayout = ({ children }) => {
  const location = useLocation()
  const isChart = location.pathname === '/chart'
  const navigate = useNavigate()

  return (
    <div className="flex w-full h-full">
      {/* ToolBar */}
      <div className="h-full w-[280px] bg-[#EFEFEF] min-h-screen sticky top-0">
        <img
          src="/img/logo_horizontal-remove.png"
          alt="logo"
          className="w-[180px] h-[40px] m-auto mt-6"
        />

        <div className="pt-12 flex flex-col justify-center items-center space-y-[16px]">
          <button
            className={classNames(
              'w-[240px] h-[56px] p-4 text-left rounded-[10px] text-[18px] flex items-center justify-start',
              isChart ? 'bg-[#F5F5F5]' : 'bg-white'
            )}
            onClick={() => {
              navigate('/')
            }}
          >
            <ArticleIcon />
            <span className="ml-3 text-[20px]" style={{ fontFamily: 'One' }}>
              투자일기
            </span>
          </button>
          <button
            className={classNames(
              'w-[240px] h-[56px] p-4 text-left rounded-[10px] text-[18px] flex items-center justify-start',
              isChart ? 'bg-white' : 'bg-[#F5F5F5]'
            )}
            onClick={() => {
              navigate('/chart')
            }}
          >
            <PieChartOutlineIcon />
            <span className="ml-3 text-[20px]" style={{ fontFamily: 'One' }}>
              포트폴리오
            </span>
          </button>
        </div>
      </div>
      {/* Body */}
      <div className="flex-1 bg-[#FAFAFA]">{children}</div>
    </div>
  )
}

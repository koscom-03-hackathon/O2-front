import ArticleIcon from '@mui/icons-material/Article'
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline'

export const RootLayout = ({ children }) => {
  return (
    <div className="flex w-full h-full">
      {/* ToolBar */}
      <div className="h-full w-[280px] bg-[#EFEFEF] min-h-screen sticky top-0">
        <div className="pt-24 flex flex-col justify-center items-center space-y-[16px]">
          <button className="w-[240px] h-[56px] p-4 text-left bg-white rounded-[10px] text-[18px] flex items-center justify-start">
            <ArticleIcon />
            <span className="ml-3">투자일기</span>
          </button>
          <button className="w-[240px] h-[56px] p-4 text-left bg-white rounded-[10px] text-[18px] flex items-center justify-start">
            <PieChartOutlineIcon />
            <span className="ml-3">포트폴리오</span>
          </button>
        </div>
      </div>
      {/* Body */}
      <div className="flex-1 bg-[#FAFAFA]">{children}</div>
    </div>
  )
}

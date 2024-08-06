import { RootLayout } from '../../components/RootLayout'
import { PieChart } from '@mui/x-charts/PieChart'
import { LineChart } from '@mui/x-charts/LineChart'
import { Box, Card, Typography, Chip } from '@mui/material'

const investments = [
  {
    id: 1,
    date: '2024.08.15',
    name: '코스피선물인버스x2',
    volume: 100,
    price: 5200,
    totalPrice: 5200000,
    type: '매수',
  },
  {
    id: 2,
    date: '2024.08.01',
    name: '코스피선물인버스x2',
    volume: 100,
    price: 5200,
    totalPrice: 5200000,
    type: '매도',
  },
  {
    id: 3,
    date: '2024.07.01',
    name: 'LG전자',
    volume: 100,
    price: 5200,
    totalPrice: 5200000,
    type: '매수',
  },
  {
    id: 4,
    date: '2024.07.01',
    name: 'LG전자',
    volume: 100,
    price: 5200,
    totalPrice: 5200000,
    type: '매도',
  },
]

export const ChartIndexPage = () => {
  const data = [
    { id: 0, value: 10, label: '주식' },
    { id: 1, value: 15, label: '채권' },
    { id: 2, value: 20, label: 'ETF' },
  ]

  return (
    <RootLayout>
      <header className="h-[68px] flex items-center justify-center border-b border-[#D3D3D3]">
        <h1
          className="text-[30px] text-[#ED6D1D] font"
          style={{ fontFamily: 'Jalnan' }}
        >
          O2 - 오늘의 투자일기
        </h1>
      </header>

      <div className="flex w-full ">
        <Box sx={{ flex: 1, padding: 1 }}>
          <Card variant="outlined">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                component="div"
                fontFamily="One"
                padding="20px"
              >
                나의 투자 현황
              </Typography>
              <div className="flex items-center justify-center w-full">
                <div className="w-[300px]">
                  <PieChart
                    series={[
                      {
                        data,
                        innerRadius: 5,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 180,
                        highlightScope: {
                          faded: 'global',
                          highlighted: 'item',
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: 'gray',
                        },
                        label: {
                          fontFamily: 'One',
                        },
                      },
                    ]}
                    height={300}
                  />
                </div>
              </div>
            </Box>
          </Card>
        </Box>
        <Box sx={{ flex: 1, padding: 1 }}>
          <Card variant="outlined">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                component="div"
                fontFamily="One"
                padding="20px"
              >
                수익률 현황
              </Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Box>
      </div>
      <div className="px-2">
        <div className="flex w-full bg-white border border-[#DEDEDE] px-8 rounded-lg pb-10 mb-6">
          <div className="w-full m-auto">
            <Typography
              variant="h5"
              component="div"
              fontFamily="One"
              padding="20px"
            >
              나의 투자 로그
            </Typography>
            <div className="grid grid-cols-2 gap-2">
              {investments.map((investment) => (
                <Card
                  key={investment.id}
                  onClick={() => handleItemClick(investment)}
                  sx={{ padding: '20px' }}
                >
                  <Typography variant="h6" fontFamily="Jalnan" fontWeight={500}>
                    {investment.name}
                  </Typography>
                  <Typography variant="body1" fontFamily="One">
                    {investment.date}
                  </Typography>
                  <Typography variant="body2">
                    {investment.volume} 주 * {investment.price} 원 ={' '}
                    {investment.totalPrice} 원
                  </Typography>
                  <Chip
                    label={investment.type}
                    color={investment.type === '매수' ? 'primary' : 'warning'}
                    sx={{
                      display: 'inline-flex',
                      whiteSpace: 'nowrap',
                      height: 'auto',
                      minWidth: '10px',
                      fontFamily: 'One',
                    }}
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
}

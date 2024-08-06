import { RootLayout } from '../../components/RootLayout'
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




export const ChartIndexPage = () => {
  const data = [
    { id: 0, value: 10, label: '주식' },
    { id: 1, value: 15, label: '채권' },
    { id: 2, value: 20, label: 'ETF' },
  ];

  return (
    <RootLayout>
      <header className="h-[68px] flex items-center justify-center border-b border-[#D3D3D3]">
        <h1 className="text-[30px] text-[#ED6D1D] font" style={{fontFamily: 'Jalnan'}}>
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
              <Typography variant="h6" component="div" fontFamily="One" padding="20px">
                나의 투자 현황
              </Typography>
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
                    cx: 400,
                    cy: 150,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  },
                ]}
                height={300}
              />
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
              <Typography variant="h6" component="div" fontFamily="One" padding="20px">
                투자 목록
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
      <div className="flex w-full">
        <Box sx={{ flex: 1, padding: 1 }}>
          <Card variant="outlined">
            <Typography variant="h6" component="div" fontFamily="One" padding="20px">
              수익률 현황
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                height={400}
              />
            </Box>
          </Card>
        </Box>
      </div>
    </RootLayout>
  )
}


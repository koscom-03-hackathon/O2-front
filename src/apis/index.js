import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://localhost:4040',
  withCredentials: true,
  headers: {
    'Content-Type': `application/json`,
  },
})

export const getDiaryList = () =>
  client.get('/diary', {
    params: {
      date: '2024-07',
    },
  })

export const getDiaryDetail = (id) => client.get(`/diary/${id}`)

export const postDiary = (data) => client.post(`/diary/new`, { data })

export const deleteDiary = (id) =>
  client.delete('diary/delete', {
    data: {
      userId: 'qwer1234',
      id,
    },
  })

export const updateDiary = ({ data }) => client.post('/diary/update', { data })

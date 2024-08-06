import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://121.141.60.242:8081',
  headers: {
    'Content-Type': `application/json`,
  },
})

export const getDiaryList = async (date) => {
  const { data } = await client.get('/diary', {
    params: {
      date,
    },
  })
  return data
}

export const getDiaryDetail = (id) =>
  client.get(`/diary/${id}`).then(({ data }) => data)

export const postDiary = (data) => client.post(`/diary/new`, data)

export const deleteDiary = (id) =>
  client.delete('diary/delete', {
    data: {
      userId: 'qwer1234',
      id,
    },
  })

export const updateDiary = ({ data }) => client.post('/diary/update', data)

export const getAIFeedback = () =>
  client.get('/diary/strategy/openai?userId=qwer1234').then(({ data }) => data)

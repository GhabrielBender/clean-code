import axios from 'axios'
import faker from 'faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {

  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({
    data: fakerStatic.random.objectElement(),
    status: fakerStatic.random.number()
  })
  return mockedAxios
}

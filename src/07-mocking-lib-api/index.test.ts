// Uncomment the code below and write your tests
jest.mock('axios');
import axios from 'axios';
const mockedAxios = axios as jest.Mocked<typeof axios>;
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const data = { userId: 1, id: 1, title: 'test post', body: 'test body' };
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue({ data });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(mockedAxios.get).toHaveBeenCalledWith('/posts/1');
    expect(result).toEqual(data);
  });

  // test('should perform request to correct provided url', async () => {
  //   const expectedData = { data: 'Test data' };
  //   mockedAxios.get.mockResolvedValue(expectedData);
  //   const relativeUrl = '/test-url';
  //   const result = await throttledGetDataFromApi(relativeUrl);
  //   expect(mockedAxios.get).toHaveBeenCalledWith(
  //     `https://jsonplaceholder.typicode.com${relativeUrl}`,
  //   );
  //   expect(result).toEqual(expectedData.data);
  // });

  test('should return response data', async () => {
    const mockResponseData = {
      id: 1,
      title: 'test post',
      body: 'test body',
      userId: 1,
    };
    mockedAxios.get.mockResolvedValue({ data: mockResponseData });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockResponseData);
  });
});

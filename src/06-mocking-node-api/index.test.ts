// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { doStuffByTimeout } from '.';

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  const cb = jest.fn();

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(cb, 500);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, 500);
    jest.advanceTimersByTime(50);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});

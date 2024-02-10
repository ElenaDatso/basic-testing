// Uncomment the code below and write your tests
// import { readFileAsynchronously } from '.';
import { doStuffByTimeout, doStuffByInterval } from '.';

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
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  const cb = jest.fn();

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(cb, 500);
    expect(setInterval).toBeCalledWith(expect.any(Function), 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(cb, 50);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(150);
    expect(cb).toHaveBeenCalledTimes(3);
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

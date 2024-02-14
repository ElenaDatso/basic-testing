// Uncomment the code below and write your tests
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('path', () => ({
  join: jest.fn(() => 'mocked/path/to/fake.txt'),
}));
jest.mock('fs/promises', () => ({
  readFile: jest.fn().mockResolvedValue('Mocked file content'),
}));

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
// import fsPromises from 'fs/promises';

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
  const fakeFile = 'fake.txt';
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(fakeFile);
    expect(join).toBeCalledWith(__dirname, fakeFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(fakeFile);
    expect(result).toBeNull();
  });

  // test('should return file content if file exists', async () => {
  //   (existsSync as jest.Mock).mockReturnValue(true);
  //   (join as jest.Mock).mockImplementation((...args) => args.join('/'));
  //   (fsPromises.readFile as jest.Mock).mockResolvedValue('Mocked file content');
  //   const result = await readFileAsynchronously('fake.txt');
  //   expect(result).toBe('Mocked file content');
  // });
});

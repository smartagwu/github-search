function asyncDelay(timeInMillis: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timeInMillis);
  });
}

export default asyncDelay;

export function createHooks(callback) {
  const global = { states: [], memoizedValues: [] };
  let index = 0;

  const useState = (initState) => {
    const currentState = global.states[index] || initState;
    global.states[index] = currentState;

    const setState = ((currentIndex) => {
      return function (value) {
        if (global.states[currentIndex] === value) return;
        global.states[currentIndex] = value;
        callback();
      };
    })(index);

    index = index + 1;
    return [currentState, setState];
  };

  const useMemo = (fn, refs) => {
    const memoRecord = global.memoizedValues[index];

    if (memoRecord && refs.every((ref, i) => ref === memoRecord.refs[i])) {
      return memoRecord.value;
    } else {
      const newValue = fn();
      global.memoizedValues[index] = { value: newValue, refs };
      index++;
      return newValue;
    }
  };

  const resetContext = () => {
    index = 0; // 상태 인덱스를 초기화
  };

  return { useState, useMemo, resetContext };
}

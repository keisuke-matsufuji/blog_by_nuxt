import { reactive } from "@nuxtjs/composition-api"

export default function useCounter() {
  /*
   * 状態
   */
  const stateCounter = reactive<{count: number;}>({
    count: 0
  })

  /*
   * ロジック
   */
  const increment = () => stateCounter.count++
  const decrement = () => stateCounter.count--

  return {
    stateCounter,
    increment,
    decrement,
  }
}

// use-counterの戻り値について、型情報を追加
export type CounterStore = ReturnType<typeof useCounter>
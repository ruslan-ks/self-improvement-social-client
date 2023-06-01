export class FunctionUtil {
  /**
   * Usage: arr.filter(FunctionUtil.unique)
   */
  static unique<T>(elem: T, index: number, array: T[]) {
    return index === array.indexOf(elem);
  }
}

export interface EndHandle<T> {
  end(extra?: Partial<T>): void;
}

export type TQueue = {
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
};

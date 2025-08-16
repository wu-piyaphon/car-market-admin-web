import { type PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-7xl p-4.5">{children}</div>;
}

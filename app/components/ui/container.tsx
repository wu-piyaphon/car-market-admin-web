import { type PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto h-full w-full max-w-7xl p-5 md:p-8">{children}</div>
  );
}

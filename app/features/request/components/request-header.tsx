import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function RequestHeader({ title, description }: Props) {
  return (
    <div className="py-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm">{description}</p>
    </div>
  );
}

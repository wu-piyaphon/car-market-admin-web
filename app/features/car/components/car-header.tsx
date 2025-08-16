import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";

type CarHeaderProps = {
  title: string;
  description: string;
  onClick: () => void;
};

export default function CarHeader({
  title,
  description,
  onClick,
}: CarHeaderProps) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClick}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

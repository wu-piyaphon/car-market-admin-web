import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SortableItem } from "~/components/ui/sortable-item";

export type FilePreviewItemProps = {
  file: File;
  index: number;
  onRemove: (index: number) => void;
  formatFileSize: (bytes: number) => string;
  disabled?: boolean;
  showRemoveButton?: boolean;
};

export function FilePreviewItem({
  file,
  index,
  onRemove,
  formatFileSize,
  disabled = false,
  showRemoveButton = true,
}: FilePreviewItemProps) {
  const itemId = `file-${index}`;

  return (
    <SortableItem id={itemId} disabled={disabled} className="relative">
      {/* Image Container */}
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        {file.type.startsWith("image/") ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="h-full w-full object-cover"
            onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
          />
        ) : (
          <ImageIcon className="h-8 w-8 text-gray-400" />
        )}
      </div>

      {/* Remove Button */}
      {showRemoveButton && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
          onClick={e => {
            e.stopPropagation();
            onRemove(index);
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      )}

      {/* File Info */}
      <div className="mt-2 space-y-1">
        <div className="truncate text-xs font-medium text-gray-600">
          {file.name}
        </div>
        <div className="text-xs text-gray-400">{formatFileSize(file.size)}</div>
      </div>
    </SortableItem>
  );
}

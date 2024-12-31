/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Copy2Icon from "@/app/icons/copy2-icon";
import { toast } from "sonner";

type Props = {
  text: string;
};

export const CopyButton = ({ text }: Props) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy!");
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="flex cursor-pointer items-center gap-2"
    >
      <span className="text-[14px] text-gray-400">Click to copy</span>
      <Copy2Icon />
    </div>
  );
};

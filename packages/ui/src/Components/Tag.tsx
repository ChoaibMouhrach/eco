import React from "react";
import Link from "next/link";

interface TagProps {
  tag: string;
}

export default function Tag({ tag }: TagProps) {
  return (
    <Link
      className="bg-gray-100 hover:bg-gray-200 text-sm p-2 rounded-md"
      href={`posts?search=${tag}`}
    >
      # {tag}
    </Link>
  );
}

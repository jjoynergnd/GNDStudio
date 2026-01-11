"use client";

import { useEffect } from "react";

type Props = {
  isUnnamed: boolean;
};

export default function ProjectTitleGuard({ isUnnamed }: Props) {
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!isUnnamed) return;
      e.preventDefault();
      e.returnValue = "";
    }

    if (isUnnamed) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isUnnamed]);

  return null;
}

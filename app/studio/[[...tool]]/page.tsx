"use client";

export const dynamic = "force-dynamic";

import dynamic_ from "next/dynamic";
import config from "../../../sanity.config";

const NextStudio = dynamic_(() =>
  import("next-sanity/studio").then((mod) => mod.NextStudio)
);

export default function Studio() {
  return <NextStudio config={config} />;
}

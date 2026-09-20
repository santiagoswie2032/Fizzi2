import {
  SliceSimulator,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";
import { redirect } from "next/navigation";

import { components } from "@/slices";

type SearchParams = {
  state?: string;
  secret?: string;
};

type SliceSimulatorPageProps = {
  searchParams: Promise<SearchParams> | SearchParams;
};

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorPageProps) {
  const { state, secret } = await searchParams;

  if (
    process.env.SLICE_SIMULATOR_SECRET &&
    secret !== process.env.SLICE_SIMULATOR_SECRET
  ) {
    redirect("/");
  }

  const slices = getSlices(state);

  return (
    <SliceSimulator background="" zIndex={10}>
      <div className="max-h-[900px]">
        <SliceZone slices={slices} components={components} />
      </div>
    </SliceSimulator>
  );
}

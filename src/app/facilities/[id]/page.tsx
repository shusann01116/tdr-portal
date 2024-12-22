import FacilityRoot from "@/features/facility/components/facility-root";
import { getFacilities } from "@/features/official/fetcher";
import { getFacilityById } from "@/features/tdr/facility";
import { ParkType } from "@/features/tdr/park";
import { notFound } from "next/navigation";

export const revalidate = 360;
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const facilities = await getFacilities(ParkType.ParkTypeTDL);
  return facilities.map((facility) => ({ id: facility.id }));
};

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const facility = await getFacilityById(id);

  if (facility == null) {
    return notFound();
  }

  return <FacilityRoot facility={facility} />;
}

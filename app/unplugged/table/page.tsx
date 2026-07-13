import type { Metadata } from 'next';
import CornerTable from '../../components/unplugged-pages/corner-table';

export const metadata: Metadata = {
  title: "Handmade Corner Table | Unplugged | Shubham Sah",
  description: "Building a custom wooden corner table from scratch: a hands-on experiment in woodworking, cutting, painting, and finishing.",
}

export default function CornerTablePage() {
  return <CornerTable />;
}
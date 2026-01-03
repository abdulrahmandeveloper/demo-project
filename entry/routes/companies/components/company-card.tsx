import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CompanyDetailsResponse } from "../interfaces/company.interface";
import { Separator } from "@/shared/components/ui/separator";
import Link from "next/link";

type CompanyCardProps = {
  company: CompanyDetailsResponse;
};
const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="px-4 py-3">
      {" "}
      <CardTitle className="my-2">{company.name}</CardTitle>
      <Link href={company.homepage}>
        <CardHeader className="h-[300px]   bg-white/25 rounded-lg grid grid-cols-1">
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${company.logo_path}`}
              alt={company.name}
              className="object-cover spect-square"
            ></img>
          </div>
        </CardHeader>
      </Link>
      <Separator />
      <CardContent className="flex justify-between opacity-50 text-sm font-serif">
        <p className="">{company.headquarters}</p>
        <p className="">{company.origin_country}</p>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;

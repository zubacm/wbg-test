import { TYPES_FILTER_NAME } from "@/lib/consts/style-consts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterTypesContent from "./content";
import { useTypes } from "@/app/api/reference-data/types/queries";

const FilterType = ({ ...rest }) => {
  const { data: types, isLoading } = useTypes();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const typesFiter = searchParams?.get(TYPES_FILTER_NAME) || "";

  const handleSelect = (id) => {
    const params = new URLSearchParams(searchParams);

    var selectedTypes = typesFiter?.split(",");

    if (selectedTypes?.some((x) => x?.toString() === id?.toString())) {
      var filtered = selectedTypes?.filter(
        (x) => x?.toString() !== id?.toString()
      );
      if (filtered?.length > 0) {
        params.set(TYPES_FILTER_NAME, filtered?.toString());
      } else {
        params.delete(TYPES_FILTER_NAME);
      }
    } else {
      var str = typesFiter?.length > 0 ? `${typesFiter},${id}` : id;
      params.set(TYPES_FILTER_NAME, str);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return <FilterTypesContent onSelect={handleSelect} types={types} {...rest} />;
};

export default FilterType;

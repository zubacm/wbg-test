import { useCountries } from "@/app/api/reference-data/countries/queries";
import FilterCountryContent from "./contet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COUNTRIES_FILTER_NAME } from "@/lib/consts/style-consts";

const FilterCountry = ({ ...rest }) => {
  const { data: countries, isLoading } = useCountries();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const countriesFilter = searchParams?.get(COUNTRIES_FILTER_NAME) || "";

  const handleSelect = (id) => {
    const params = new URLSearchParams(searchParams);

    var selectedCountries = countriesFilter?.split(",");

    if (selectedCountries?.some((x) => x?.toString() === id?.toString())) {
      var filtered = selectedCountries?.filter(
        (x) => x?.toString() !== id?.toString()
      );
      
      if (filtered?.length > 0) {
        params.set(COUNTRIES_FILTER_NAME, filtered?.toString());
      } else {
        params.delete(COUNTRIES_FILTER_NAME);
      }
    } else {
      var str = countriesFilter?.length > 0 ? `${countriesFilter},${id}` : id;
      params.set(COUNTRIES_FILTER_NAME, str);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterCountryContent
      onSelect={handleSelect}
      countries={countries}
      {...rest}
    />
  );
};

export default FilterCountry;

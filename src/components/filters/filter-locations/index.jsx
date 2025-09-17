import FilterLocationsContent from "./content";

const FilterLocations = ({ onSelect = () => {}, ...rest }) => {
  // const [search, setSearch] = useState("");
  // const { data: locations, isLoading } = useLocations();

  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const locationsFilter = searchParams?.get(LOCATIONS_FILTER_NAME) || "";

  const handleSelect = (value) => {
    onSelect?.(value);
    // const params = new URLSearchParams(searchParams);
    // var selected = locationsFilter?.split(",");
    // if (selected?.some((x) => x?.toString() === id?.toString())) {
    //   var filtered = selected?.filter((x) => x?.toString() !== id?.toString());
    //   if (filtered?.length > 0) {
    //     params.set(LOCATIONS_FILTER_NAME, filtered?.toString());
    //   } else {
    //     params.delete(LOCATIONS_FILTER_NAME);
    //   }
    // } else {
    //   var str = locationsFilter?.length > 0 ? `${locationsFilter},${id}` : id;
    //   params.set(LOCATIONS_FILTER_NAME, str);
    // }
    // router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterLocationsContent
      onSelect={handleSelect}
      // locations={locations}
      {...rest}
    />
  );
};

export default FilterLocations;

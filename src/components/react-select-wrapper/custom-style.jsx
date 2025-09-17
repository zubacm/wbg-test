export const customStyles = {
  container: (p, s) => ({
    ...p,
    minHeight: "40px",
    maxHeight: "unset",
    width: "100%",
  }),
  input: (p, s) => ({
    ...p,
    color: "var(--gray-100)",
  }),
  control: (p, s) => ({
    ...p,
    minHeight: "40px",
    maxHeight: "unset",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "0",
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    outline: s.isFocused ? "green" : "none",
    outlineOffset: s.isFocused ? "4px" : "0",
    "&:hover": {
      border: `1px solid var(--gray-50)`,
      boxSizing: "border-box",
      minHeight: "40px",
      maxHeight: "unset",
    },
    // This line disable the blue border
    boxShadow: "none",
    backgroundColor: s.isDisabled ? "var(--gray-50)" : "var(--white)",
    border: `1px solid var(--gray-60)`,
    borderRadius: "12px",
    color: s.isDisabled
      ? "var(--gray-90)"
      : s.isFocused
      ? "var(--button-primary-txt)"
      : "var(--gray-100)",
  }),
  menu: (p, s) => ({
    ...p,
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    borderRadius: "12px",
    backgroundColor: "var(--white)",
    color: "var(--gray-100)",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  option: (p, s) => ({
    ...p,
    fontWeight: "400",
    fontSize: "16px",
    padding: "16px",
    lineHeight: "0",
    backgroundColor: s.isSelected
      ? "var(--white)"
      : s.isFocused
      ? "var(--button-primary-txt)"
      : "transparent",
    "&:hover": {
      backgroundColor: "var(--button-primary-bg)",
      color: "unset",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "pre",
    },
  }),
  multiValue: (p, s) => ({
    ...p,
    borderRadius: "12px",
    backgroundColor: !s.isDisabled && "var(--button--primary-bg)",
    backdropFilter: "blur(48px)",
    "&:hover": {
      backgroundColor: !s.isDisabled && "var(--button-primary-bg)",
    },
    backgroundColor: "var(--gray-10)",
    padding: "4px",
  }),
  multiValueLabel: (p, s) => ({
    ...p,
    color: !s.isDisabled && "var(--gray-100)",
    fontWeight: 500,
    padding: "8px 4px",
  }),
  multiValueRemove: (p, s) => ({
    ...p,
    borderRadius: `0 12px 12px 0`,
    color: "var(--gray-80)",
    "&:hover": {
      backgroundColor: "transparent",
      color: "var(--gray-100)",
      cursor: "pointer",
    },
  }),
};

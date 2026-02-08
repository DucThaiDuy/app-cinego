export type SelectOption = {
  value: number | string;
  label: string;
  image?: string;
};

export type SearchableSelectProps = {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: number | string;
  onChange: (value: number | string) => void;
};

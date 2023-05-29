import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchComboBox({
  options,
  placeholder,
}: {
  options: any;
  placeholder: string;
}) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
        />
      )}
    />
  );
}

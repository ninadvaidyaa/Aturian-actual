import {
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

function Search(): JSX.Element {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: "100%", md: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
            <InputAdornment
              position="start"
              sx={{ mr: -0.5 }}
            >
              <SearchOutlinedIcon
                sx={{
                  width: theme.spacing(2.25),
                  marginRight: theme.spacing(1.75),
                }}
              />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            "aria-label": "weight",
          }}
          placeholder="Search"
        />
      </FormControl>
    </Box>
  );
}

export default Search;

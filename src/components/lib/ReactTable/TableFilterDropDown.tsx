import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Autocomplete, {
  type AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === "light" ? " #eaecef" : "#30363d"
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === "light" ? "#e1e4e8" : "#30363d"}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === "light" ? "rgba(149, 157, 165, 0.2)" : "rgb(1, 4, 9)"
  }`,
  borderRadius: 6,
  zIndex: theme.zIndex.modal,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
}));

interface SelectFilterProps {
  data: string[];
  label: string;
  value: string[];
  setValue: (inp: string[]) => void;
}

function SelectFilter({ data, label, value, setValue }: SelectFilterProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pendingValue, setPendingValue] = React.useState<string[]>([]);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? label : undefined;

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        disableRipple
        aria-describedby={id}
        onClick={handleClick}
        sx={{ padding: "0px 8px" }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            backgroundClip: "white",
          }}
        >
          {label}
        </span>
      </Button>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box
              sx={{
                padding: "8px 10px",
              }}
            >
              {label}
            </Box>
            <Autocomplete
              open
              multiple
              onClose={(
                event: React.ChangeEvent<unknown>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === "keydown" &&
                  (event as React.KeyboardEvent).key === "Backspace" &&
                  reason === "removeOption"
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    component={CheckOutlinedIcon}
                    sx={{ width: 17, height: 17, mr: "8px" }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
                    }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      "& span": {
                        color:
                          theme.palette.mode === "light"
                            ? "#586069"
                            : "#8b949e",
                      },
                    }}
                  >
                    {option}
                  </Box>
                </li>
              )}
              options={data}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter labels"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-input": { py: 0.5, px: 0.75 },
                  }}
                  size="small"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
}

export default SelectFilter;

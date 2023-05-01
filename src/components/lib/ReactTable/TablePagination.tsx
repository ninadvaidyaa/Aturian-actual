import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "components/@extended/IconButton";

import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";

const List = styled("ul")(({ theme }) => ({
  display: "flex",
  paddingInlineStart: theme.spacing(1),
  listStyleType: "none",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const ListItem = styled("li")(({ theme }) => ({
  height: theme.spacing(4),
  minWidth: theme.spacing(4),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.secondary.main,
}));

interface TablePaginationProps {
  gotoPage: (value: number) => void;
  setPageSize: (value: number) => void;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onFirstPageClick: () => void;
  onLastPageClick: () => void;
}

const TablePagination = ({
  gotoPage,
  setPageSize,
  pageSize,
  pageIndex,
  rowCount,
  hasNextPage,
  hasPrevPage,
  onPreviousClick,
  onNextClick,
  onFirstPageClick,
  onLastPageClick,
}: TablePaginationProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const countStart = pageIndex === 0 ? 1 : pageIndex * pageSize + 1;
  const countEnd = pageIndex === 0 ? pageSize : pageIndex * pageSize + pageSize;

  const handleChangePagination = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="end"
      sx={{
        px: theme.spacing(2),
        py: theme.spacing(2),
      }}
    >
      <Paper elevation={0}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="end"
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{
              px: theme.spacing(2),
            }}
          >
            <Typography
              variant="caption"
              color="secondary"
            >
              Row per page
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={pageSize}
                onChange={handleChange}
                size="small"
                sx={{ "& .MuiSelect-select": { py: 0.75, px: 1.25 } }}
              >
                <MenuItem value={5}>5</MenuItem>
                {/* <MenuItem value={10}>10</MenuItem> */}
                <MenuItem value={50}>50</MenuItem>
                {/* <MenuItem value={25}>25</MenuItem> 
            <MenuItem value={100}>100</MenuItem> */}
              </Select>
            </FormControl>
          </Stack>
          <nav>
            <List sx={{ paddingInline: theme.spacing(2) }}>
              <li>
                <span style={{ color: theme.palette.secondary.main }}>
                  {rowCount
                    ? `${countStart}–${countEnd} of ${rowCount}`
                    : `0–0 of 0`}
                </span>
              </li>
              <ListItem>
                <IconButton
                  aria-label="first"
                  title="first"
                  disabled={!hasPrevPage}
                  onClick={onFirstPageClick}
                  color="inherit"
                >
                  <SkipPreviousOutlinedIcon fontSize="medium" />
                </IconButton>
              </ListItem>
              <ListItem className="selected">
                <IconButton
                  color="inherit"
                  aria-label="previous"
                  title="previous"
                  disabled={!hasPrevPage}
                  onClick={onPreviousClick}
                >
                  <ArrowLeftOutlinedIcon fontSize="medium" />
                </IconButton>
              </ListItem>
              <ListItem style={{ maxWidth: "48px" }}>
                <TextField
                  className="no-arrow"
                  size="small"
                  type="number"
                  onChange={(e) => {
                    handleChangePagination(e);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-input": { py: 0.5, px: 0.75 },
                  }}
                  defaultValue={pageIndex + 1}
                  variant="outlined"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  disabled={!rowCount}
                />
              </ListItem>
              <ListItem>
                <IconButton
                  color="inherit"
                  aria-label="next"
                  title="next"
                  disabled={!hasNextPage}
                  onClick={onNextClick}
                >
                  <ArrowRightOutlinedIcon fontSize="medium" />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton
                  aria-label="last"
                  title="last"
                  disabled={!hasNextPage}
                  onClick={onLastPageClick}
                  color="inherit"
                >
                  <SkipNextOutlinedIcon fontSize="medium" />
                </IconButton>
              </ListItem>
            </List>
          </nav>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default TablePagination;
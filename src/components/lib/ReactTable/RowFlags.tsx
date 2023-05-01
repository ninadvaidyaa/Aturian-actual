import { useTheme } from "@mui/material/styles";
import IconButton from "components/@extended/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { CellContext } from "@tanstack/react-table";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import MultiOrder from "components/icons/MultiOrder";
import React from "react";

const genericMemo: <T>(component: T) => T = React.memo;

interface RowActionsProps<TData, P> {
  info: CellContext<TData, P>;
}

const FlagComponent = <TData, P>({ info }: RowActionsProps<TData, P>) => {
  const theme = useTheme();

  return (
    <>
      <Stack
        direction="row"
        gap={theme.spacing(0.1)}
      >
        <Box>
          <IconButton
            size="small"
            shape="rounded"
            edge="start"
            aria-label="comments"
            color="secondary"
          >
            <SpeedOutlinedIcon
              style={{ fontSize: "1.15rem", color: "#D80B0B" }}
            />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            size="small"
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
          >
            <PauseCircleOutlineOutlinedIcon
              style={{ fontSize: "1.15rem", color: "#D2AC06" }}
            />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            size="small"
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
          >
            <ReportProblemOutlinedIcon
              style={{ fontSize: "1.15rem", color: "#DB9409" }}
            />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            size="small"
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
          >
            <CheckCircleOutlineOutlinedIcon
              style={{ fontSize: "1.15rem", color: "#008000" }}
            />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            size="small"
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
          >
            <MultiOrder style={{ fontSize: "1.15rem" }} />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            size="small"
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
          >
            <DateRangeOutlinedIcon
              style={{ fontSize: "1.15rem", color: "#1890FF" }}
            />
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};

const  Flags = genericMemo(FlagComponent);
export default Flags;

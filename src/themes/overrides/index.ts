import type { Theme } from "@mui/material/styles";

import { merge } from "lodash-es";

import Alert from "./Alert";
import AlertTitle from "./AlertTitle";
import Typography from "./Typography";
import InputBase from "./InputBase";
import InputLabel from "./InputLabel";
import LinearProgress from "./LinearProgress";
import Link from "./Link";
import ListItemButton from "./ListItemButton";
import ListItemIcon from "./ListItemIcon";
import LoadingButton from "./LoadingButton";
import TableBody from "./TableBody";
import TableCell from "./TableCell";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";
import TableContainer from "./TableContainer";

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Alert(theme),
    AlertTitle(),
    InputBase(),
    InputLabel(theme),
    LinearProgress(),
    Link(),
    ListItemButton(theme),
    ListItemIcon(theme),
    LoadingButton(),
    TableBody(theme),
    TableCell(theme),
    TableContainer(theme),
    TableFooter(theme),
    TableHead(theme),
    Typography()
  );
}

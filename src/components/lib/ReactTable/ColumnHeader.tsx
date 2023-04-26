import type { Table, Header, Column } from "@tanstack/react-table";
import { useEffect, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { useDrag, useDragLayer, useDrop } from "react-dnd";
import type { DragLayerMonitor } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DragOutlined } from "@ant-design/icons";

import { styled, useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";

import { reorderColumn } from "./reorderColumn";

const DragHeader = styled("div")(
  ({ theme, x, y }: { theme: Theme; x: number; y: number }) => ({
    color: theme.palette.text.secondary,
    position: "fixed",
    pointerEvents: "none",
    left: 12,
    top: 24,
    transform: `translate(${x}px, ${y}px)`,
    opacity: 0.6,
  })
);

interface ColumnHeaderProps<P> {
  header: Header<P, unknown>;
  table: Table<P>;
}
export const DragPreview = () => {
  const theme = useTheme();

  const { isDragging, item, currentOffset } = useDragLayer(
    (monitor: DragLayerMonitor<Record<string, any>>) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  const { x, y } = currentOffset ?? {};

  return isDragging ? (
    <DragHeader
      theme={theme}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      x={x!}
      //  eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      y={y!}
    >
      {item.header && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <DragOutlined style={{ fontSize: "1rem" }} />
          <Typography>{item.header}</Typography>
        </Stack>
      )}
    </DragHeader>
  ) : null;
};

const DraggableColumnHeader = <T,>({ header, table }: ColumnHeaderProps<T>) => {
  const theme = useTheme();
  const ref = useRef();
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [{ isOverCurrent }, drop] = useDrop({
    accept: "column",
    drop: (draggedColumn: Column<T>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
    canDrag: !column.columnDef.enablePinning,
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  useEffect(() => {
    if (header.column.columnDef.enablePinning) {
      header.column.pin("left");
    }
  }, []);

  let borderColor = theme.palette.text.primary;
  if (isOverCurrent) {
    borderColor = theme.palette.primary.main;
  }
  drag(drop(ref));
  return (
    <TableCell
      colSpan={header.colSpan}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Box>
        <Box
          ref={ref}
          onClick={header.column.getToggleSortingHandler()}
          sx={{
            color: borderColor,
            minWidth: theme.spacing(8),
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </Box>
      </Box>
    </TableCell>
  );
};

export default DraggableColumnHeader;

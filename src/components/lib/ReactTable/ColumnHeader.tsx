import type { Table, Header, Column } from "@tanstack/react-table";
import { useEffect, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { useDrag, useDragLayer, useDrop } from "react-dnd";
import type { DragLayerMonitor } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { styled, useTheme } from "@mui/material/styles";

import { reorderColumn } from "./reorderColumn";
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdOutlineDragHandle,
} from "react-icons/md";

const DragHeader = styled("div")(({ x, y }: { x: number; y: number }) => ({
  position: "fixed",
  pointerEvents: "none",
  left: 12,
  top: 24,
  transform: `translate(${x}px, ${y}px)`,
  opacity: 0.6,
}));

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
        <div className="flex flex-row items-center gap-1">
          <MdOutlineDragHandle style={{ fontSize: "1rem" }} />
          <p>{item.header}</p>
        </div>
      )}
    </DragHeader>
  ) : null;
};

const DraggableColumnHeader = <T,>({ header, table }: ColumnHeaderProps<T>) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;
  const { columnDef } = column;

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
    if (columnDef.enablePinning) {
      if (column.id === "action") {
        header.column.pin("right");
      } else {
        column.pin("left");
      }
    }
  }, []);

  let borderColor = theme.palette.text.primary;
  if (isOverCurrent) {
    borderColor = theme.palette.primary.main;
  }
  drag(drop(ref));

  return (
    <th
      className={
        "group min-w-[10ch] text-ellipsis whitespace-nowrap px-1.5 py-2 text-left"
      }
      colSpan={header.colSpan}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: header.getSize(),
        borderColor,
      }}
    >
      <div className="relative flex flex-row items-center justify-between">
        <div
          ref={ref}
          className="overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {header.isPlaceholder
            ? null
            : flexRender(columnDef.header, header.getContext())}
        </div>
        {columnDef.enableSorting && (
          <div
            className="flex flex-col"
            onClick={header.column.getToggleSortingHandler()}
          >
            <MdOutlineArrowDropUp
              style={{
                fontSize: "1.25rem",
                color:
                  column.getIsSorted() === "asc"
                    ? theme.palette.text.secondary
                    : "inherit",
              }}
            />
            <MdOutlineArrowDropDown
              style={{
                fontSize: "1.25rem",
                marginTop: theme.spacing(-1.5),
                color:
                  column.getIsSorted() === "desc"
                    ? theme.palette.text.secondary
                    : "inherit",
              }}
            />
          </div>
        )}
        <div
          className={`absolute right-0 top-0 h-full w-1 ${
            header.column.getIsResizing() ? "bg-gray-200" : "bg-gray-100"
          } hover:opacity-1 opacity-1 cursor-col-resize touch-none select-none`}
          {...{
            onMouseDown: header.getResizeHandler(),
            onTouchStart: header.getResizeHandler(),
          }}
        />
      </div>
    </th>
  );
};

export default DraggableColumnHeader;

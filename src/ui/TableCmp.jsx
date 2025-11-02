import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';



export default function TableCmp({ data, columns,onDelete,onEdit,onCreate,reOrderData }) {
  const [tableData, setTableData] = useState(data); 
  useEffect(()=>{
    setTableData(data);
  },[data]);
  if (!data || data.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No Data Available
      </Typography>
    );
  }
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedRows=Array.from(tableData);
    const movedRow=updatedRows.splice(result.source.index,1);
    updatedRows.splice(result.destination.index,0,movedRow[0]);

    const reordered = updatedRows.map((item, index) => ({
      ...item,
      displayOrder: index + 1,
    }));
    console.log('reorder',reordered);
    setTableData(reordered);
    reOrderData(reordered);
  };

  function handleEdit(row){
    console.log(row);
    onEdit(row)
  }
  return (
    <>
      {/* <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.200" }}>
              {columns.map((col) => (
                <TableCell key={col} sx={{ textTransform: "capitalize" }}>
                  <strong>{col}</strong>
                </TableCell>
              ))}
              <TableCell sx={{ textTransform: "capitalize" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row._id || index} hover>
                {columns.map((col) => {
                  const value = row[col];

                  if (
                    typeof value === "string" &&
                    value.match(/\.(jpeg|jpg|png|webp|gif)$/i)
                  ) {
                    return (
                      <TableCell key={col}>
                        <Box
                          component="img"
                          src={value}
                          alt={row.title || "image"}
                          sx={{
                            width: 100,
                            height: 60,
                            borderRadius: 2,
                            objectFit: "cover",
                            boxShadow: 1,
                          }}
                        />
                      </TableCell>
                    );
                  }

                  if (typeof value === "string" && value.startsWith("http")) {
                    return (
                      <TableCell key={col}>
                        <Link href={value} target="_blank" rel="noopener">
                          {value.length > 30
                            ? value.slice(0, 30) + "..."
                            : value}
                        </Link>
                      </TableCell>
                    );
                  }

                  if (col.toLowerCase().includes("date") && value) {
                    return (
                      <TableCell key={col}>
                        {new Date(value).toLocaleString()}
                      </TableCell>
                    );
                  }

                  return <TableCell key={col}>{value ?? "-"}</TableCell>;
                })}
                <TableCell className="!p-0">
                  <Tooltip title="Edit">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

<DragDropContext onDragEnd={handleDragEnd}>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.200" }}>
              <TableCell></TableCell>
              {columns.map((col) => (
                <TableCell key={col} sx={{ textTransform: "capitalize" }}>
                  <strong>{col}</strong>
                </TableCell>
              ))}
              <TableCell sx={{ textTransform: "capitalize" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <Droppable droppableId="table-body" type="TABLE">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {tableData.map((row, index) => (
                  <Draggable
                    key={row._id || index}
                    draggableId={row._id?.toString() || index.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        hover
                        sx={{
                          backgroundColor: snapshot.isDragging
                            ? "grey.100"
                            : "inherit",
                        }}
                      >
                        <TableCell {...provided.dragHandleProps} width="50px">
                          <DragIndicatorIcon sx={{ cursor: "grab", color: "grey.600" }} />
                        </TableCell>
                        {columns.map((col) => {
                          const value = row[col];

                          // Image
                          if (
                            typeof value === "string" &&
                            value.match(/\.(jpeg|jpg|png|webp|gif)$/i)
                          ) {
                            return (
                              <TableCell key={col}>
                                <Box
                                  component="img"
                                  src={value}
                                  alt={row.title || "image"}
                                  sx={{
                                    width: 100,
                                    height: 60,
                                    borderRadius: 2,
                                    objectFit: "cover",
                                    boxShadow: 1,
                                  }}
                                />
                              </TableCell>
                            );
                          }

                          // Link
                          if (
                            typeof value === "string" &&
                            value.startsWith("http")
                          ) {
                            return (
                              <TableCell key={col}>
                                <Link href={value} target="_blank" rel="noopener">
                                  {value.length > 30
                                    ? value.slice(0, 30) + "..."
                                    : value}
                                </Link>
                              </TableCell>
                            );
                          }

                          // Date
                          if (col.toLowerCase().includes("date") && value) {
                            return (
                              <TableCell key={col}>
                                {new Date(value).toLocaleString()}
                              </TableCell>
                            );
                          }

                          return <TableCell key={col}>{value ?? "-"}</TableCell>;
                        })}

                        {/* Actions */}
                        <TableCell className="!p-0">
                            <Tooltip title="Edit">
                              <IconButton className="!text-amber-500" onClick={()=>handleEdit(row)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" onClick={()=>onDelete(row)}>
                              <IconButton color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </TableContainer>
    </DragDropContext>

    <Button className="!bg-amber-500 !px-5 !py-5 !text-amber-100 !mt-5 !rounded-2xl !cursor-pointer hover:!bg-amber-600" onClick={()=>onCreate()}>Add Document</Button>
    </>
  );
}

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit, Visibility, Delete, VisibilityOff } from "@mui/icons-material";
import styles from "../homepage.module.css";
import EditProductModal from "./EditProductModal";
import { Item } from "..";

type TableProps = {
  isAdmin: boolean;
  data: Item[];
  handleEdit: (item: Item) => void;
  deleteItem: (id: number) => void;
};

const Table = ({ isAdmin, data, handleEdit, deleteItem }: TableProps) => {
  const [showModal, setshowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>(data[0]);

  const onEdit = (item: Item) => {
    setSelectedItem(item);
    setshowModal(!showModal);
  };
  const handleDisable = (product: Item) => {
    handleEdit({
      ...product,
      disabled: !product.disabled,
    });
  };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: styles.headerCell,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      headerClassName: styles.headerCell,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerClassName: styles.headerCell,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerClassName: styles.headerCell,
    },
    {
      field: "value",
      headerName: "Value",
      flex: 1,
      headerClassName: styles.headerCell,
    },
    {
      field: "action",
      headerName: "ACTION",
      flex: 1,
      renderCell: (params: { row: Item }) => (
        <div className={styles.actions}>
          <IconButton
            className={styles.actionButton}
            disabled={!isAdmin || params.row.disabled}
            onClick={() => onEdit(params.row)}
          >
            <Edit className={styles.icon} />
          </IconButton>
          <IconButton
            className={styles.eyeButton}
            disabled={!isAdmin}
            onClick={() => handleDisable(params.row)}
          >
            {params.row.disabled ? (
              <VisibilityOff className={styles.icon} />
            ) : (
              <Visibility className={styles.icon} />
            )}
          </IconButton>
          <IconButton
            className={styles.deleteButton}
            disabled={!isAdmin || params.row.disabled}
            onClick={() => deleteItem(params.row.id)}
          >
            <Delete className={styles.icon} />
          </IconButton>
        </div>
      ),
      sortable: false,
      headerClassName: styles.headerCell,
    },
  ];

  const rows = data;

  return (
    <>
      <div className={styles.dataTableContainer}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          className={styles.dataTable}
          getRowClassName={(rowData) =>
            rowData.row.disabled ? "text-gray-500" : "text-white"
          }
          getRowId={(item) => item.id}
          isRowSelectable={(rowData) => {
            //prevents selection of row with title "Attorney"
            return rowData.row.disabled;
          }}
        />
      </div>
      <EditProductModal
        show={showModal}
        onClose={() => {
          setshowModal(false);
        }}
        product={selectedItem}
        updateProduct={handleEdit}
      />
    </>
  );
};

export default Table;

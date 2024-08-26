import React, { useEffect, useState } from "react";
import styles from "../homepage.module.css";
import { Close } from "@mui/icons-material";
import { Item } from "..";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  product: Item;
  updateProduct: (item: Item) => void;
};
const EditProductModal = ({
  show,
  onClose,
  product,
  updateProduct,
}: ModalProps) => {
  const [category, setCategory] = useState(product?.category);
  const [price, setPrice] = useState(product?.price.replace("$", ""));
  const [quantity, setQuantity] = useState(product?.quantity);
  const [value, setValue] = useState(product?.value.replace("$", ""));
  useEffect(() => {
    setCategory(product.category);
    setPrice(product.price.replace("$", ""));
    setQuantity(product.quantity);
    setValue(product.value.replace("$", ""));
  }, [product]);

  if (!show) {
    return null;
  }

  const handleSave = () => {
    // Logic to save the edited product data
    updateProduct({
      id: product.id,
      name: product.name,
      category,
      price: `$${price}`,
      quantity,
      value: `$${value}`,
      disabled: product.disabled,
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Edit product</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <Close />
          </button>
        </div>
        <h4 className={styles.productName}>{product?.name}</h4>
        <div className={styles.modalBody}>
          <div className={styles.modalRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.modalRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;

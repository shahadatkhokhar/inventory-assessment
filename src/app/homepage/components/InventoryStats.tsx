import React from "react";
import Card from "./Card";
import styles from "../homepage.module.css";
import {
  ShoppingCart,
  AttachMoney,
  RemoveShoppingCart,
  Category,
} from "@mui/icons-material";

type StatsProps = {
  cardData: {
    totalProducts: number;
    totalStoreValue: number;
    outOfStocks: number;
    uniqueCategories: number;
  };
};
const InventoryStats = ({ cardData }: StatsProps) => {
  const { totalProducts, totalStoreValue, outOfStocks, uniqueCategories } =
    cardData;
  const stats = [
    {
      icon: <ShoppingCart className={styles.iconStyle} />,
      title: "Total product",
      value: totalProducts,
    },
    {
      icon: <AttachMoney className={styles.iconStyle} />,
      title: "Total store value",
      value: totalStoreValue,
    },
    {
      icon: <RemoveShoppingCart className={styles.iconStyle} />,
      title: "Out of stocks",
      value: outOfStocks,
    },
    {
      icon: <Category className={styles.iconStyle} />,
      title: "No of Category",
      value: uniqueCategories,
    },
  ];

  return (
    <div className={styles.inventorystats}>
      <h2 className={styles.statstitle}>Inventory stats</h2>
      <div className={styles.statscards}>
        {stats.map((stat, index) => (
          <Card
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryStats;

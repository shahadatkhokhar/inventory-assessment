"use client";
import { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import Navbar from "./components/Navbar";
import InventoryStats from "./components/InventoryStats";
import Table from "./components/Table";
import axios from "axios";

export type Item = {
  id: number;
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  disabled: boolean;
};
export default function HomePage() {
  const [isUser, setIsUser] = useState(false);
  const [data, setData] = useState<Item[]>([]);
  const [cardData, setCardData] = useState({
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStocks: 0,
    uniqueCategories: 0,
  });
  useEffect(() => {
    axios
      .get("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((res) => {
        console.log(res.data, "fgjhknlm;,");
        let newData = res.data.map((item: Item, index: number) => {
          item.id = index;
          item.disabled = false;
          return item;
        });
        console.log(newData);
        setData(newData);
        const totalProducts = newData.length;

        const totalStoreValue = newData.reduce(
          (total: number, item: { value: string }) => {
            const value = parseFloat(item.value.replace("$", ""));
            return total + value;
          },
          0
        );

        const outOfStocks = newData.filter(
          (item: Item) => item.quantity === 0
        ).length;

        const uniqueCategories = [
          //@ts-ignore
          ...new Set(newData.map((item: { category: any }) => item.category)),
        ].length;
        const stats = {
          totalProducts,
          totalStoreValue,
          outOfStocks,
          uniqueCategories,
        };
        setCardData(stats);
      });
  }, []);

  const calculateData = (newData: Item[]) => {
    const totalProducts = newData.length;

    const totalStoreValue = newData.reduce(
      (total: number, item: { value: string }) => {
        const value = parseFloat(item.value.replace("$", ""));
        return total + value;
      },
      0
    );

    const outOfStocks = newData.filter(
      (item: Item) => item.quantity === 0
    ).length;

    const uniqueCategories = [
      //@ts-ignore
      ...new Set(newData.map((item: { category: any }) => item.category)),
    ].length;
    const stats = {
      totalProducts,
      totalStoreValue,
      outOfStocks,
      uniqueCategories,
    };
    setCardData(stats);
  };

  const editItem = (newItem: Item) => {
    let tempArr = [...data];
    let index = tempArr.findIndex((item) => item.id === newItem.id);
    if (index !== -1) {
      tempArr[index] = newItem;
    }
    setData(tempArr);
    calculateData(tempArr);
  };

  const deleteItem = (id: number) => {
    let tempArr = [...data];
    const index = tempArr.findIndex((item) => item.id === id);
    if (index !== -1) tempArr.splice(index, 1);
    setData(tempArr);
    calculateData(tempArr);
  };

  return (
    <main className={styles.container}>
      <Navbar isUser={isUser} setIsUser={setIsUser} />
      <InventoryStats cardData={cardData} />
      {data.length != 0 && (
        <Table
          isAdmin={!isUser}
          data={data}
          handleEdit={editItem}
          deleteItem={deleteItem}
        />
      )}
    </main>
  );
}

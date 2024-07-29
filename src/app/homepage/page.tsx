"use client";
import { useContexts } from "@/contexts/Context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Transection from "@/components/transaction/Transection";
import { expenseColumns, incomeColumns } from "./state";
import { Card, Modal } from "antd";
import stateManager from "@/contexts/stateManager";
import useIncomeApi from "@/hooks/useApi/useIncomeApi";
import useExpenseApi from "@/hooks/useApi/useExpenseApi";
type TransectionType = "expense" | "income" | "saving";
interface TransectionModel {
  type: string;
  value: number;
  createDate: Date;
  tagId: string;
}
const DialogTransection: React.FC<{
  open: boolean;
  onCancel: Function;
  onSubmit: Function;
  type: string;
}> = ({ open, onCancel, onSubmit, type }) => {
  const { spendingTypes } = useContexts()!;

  return (
    <>
      <Modal
        title={spendingTypes.find((x) => x.spendingTypeId === type).nameTh}
        centered
        open={open}
        // onOk={() => setModal2Open(false)}
        onCancel={() => onCancel()}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

const HomePage = () => {
  const router = useRouter();
  const [incomes, setIncome] = useState([]);
  const [expenses, setExpense] = useState([]);
  const { spendingTypes, systemTags, customTags } = useContexts()!;
  const [allTag, setAllTag] = useState([]);
  const [OpenDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/homepage") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    setAllTag([...systemTags, ...customTags]);
  }, [systemTags, customTags]);

  const fetchData = async () => {
    var start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    var end = new Date();
    end.setUTCHours(23, 59, 59, 0);

    try {
      const [incomeData, expenseData] = await Promise.all([
        useIncomeApi().getIncomes(start, end),
        useExpenseApi().getExpenses(start, end),
      ]);

      setIncome(
        incomeData.map((g) => ({
          ...g,
          key: g.incomeId,
          tagId: allTag.find((f) => f.tagId === g.tagId)?.nameTh || g.tagId,
          createdDate: new Date(g.createdDate).toLocaleTimeString("en-GB", {
            hour12: false,
          }),
        }))
      );

      setExpense(
        expenseData.map((g) => ({
          ...g,
          key: g.expenseId,
          tagId: allTag.find((f) => f.tagId === g.tagId)?.nameTh || g.tagId,
          createdDate: new Date(g.createdDate).toLocaleTimeString("en-GB", {
            hour12: false,
          }),
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [allTag]);

  return (
    <div className="px-4 py-4 flex flex-col gap-2">
      <div>
        <div className="font-bold">ข้อมูลรายวัน</div>
        <div className="flex w-full gap-4 my-4">
          <Transection
            columns={incomeColumns}
            dataSource={incomes}
            type="income"
            isClickCallBack={() => {
              setOpenDialog((x) => true);
            }}
          ></Transection>
          <Transection
            columns={expenseColumns}
            dataSource={expenses}
            type="expense"
            isClickCallBack={() => {
              setOpenDialog((x) => true);
            }}
          ></Transection>
        </div>
      </div>
      <div>
        <div>
          <p className="font-bold">ข้อมูลรายเดือน</p>
          <div className="flex w-full gap-4 h-60">
            <div className="w-full flex flex-col">
              <div className="font-medium text-gray-500 ">เดือนปัจจุบัน</div>
              <Card className="h-full"></Card>
            </div>
            <div className="w-full flex flex-col">
              <div className="font-medium text-gray-500 ">เดือนที่ผ่านมา</div>
              <Card className="h-full"></Card>
            </div>
          </div>
        </div>
      </div>
      <DialogTransection
        type="3ca5eecd-0a40-49f6-91bf-f5761c04e7f2"
        onSubmit={() => {}}
        open={OpenDialog}
        onCancel={() => {
          setOpenDialog((x) => false);
        }}
      ></DialogTransection>
    </div>
  );
};

export default HomePage;

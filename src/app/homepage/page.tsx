"use client";
import { useContexts } from "@/contexts/Context";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Transection from "@/components/transaction/Transection";
import { expenseColumns, incomeColumns } from "./state";
import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Dropdown,
  InputNumber,
  InputNumberProps,
  MenuProps,
  Modal,
  Space,
  TimePicker,
  TimePickerProps,
} from "antd";
import stateManager from "@/contexts/StateManager";
import useIncomeApi from "@/hooks/useApi/useIncomeApi";
import useExpenseApi from "@/hooks/useApi/useExpenseApi";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
type TransectionType = "expense" | "income" | "saving";
interface TransectionModel {
  type: string;
  value: number;
  createDate: Date;
  tagId: string;
}
interface MenuItem {
  key: string;
  label: string;
}
const DropdownItems: React.FC<{ items: MenuProps["items"] }> = ({
  items = [],
}) => {
  const [selected, setSelected] = useState("ชนิดรายการ");
  const onClick: MenuProps["onClick"] = ({ key }) => {
    const item = items.find(
      (x): x is MenuItem =>
        typeof x !== "string" && "label" in x! && x.key === key
    );
    if (item) {
      console.log(item.key);
      setSelected(item.label);
    }
  };
  return (
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      <Button>
        <Space>
          {selected}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};
const DialogTransection: React.FC<{
  open: boolean;
  onCancel: Function;
  onSubmit: Function;
  type: string;
  dropdowns: [];
}> = ({ open, onCancel, onSubmit, type, dropdowns }) => {
  const { spendingTypes } = useContexts()!;
  const items: MenuProps["items"] = dropdowns
    .filter((x) => x.spendingTypeId === type)
    .map((x) => {
      return {
        label: x.nameTh,
        onClick: (e) => {
          console.log(e.Key);
        },
        key: x.tagId,
      };
    });
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };
  const onTimeChange: TimePickerProps["onChange"] = (time, timeString) => {
    console.log(time, timeString);
  };
  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <Modal
        title={spendingTypes.find((x) => x.spendingTypeId === type).nameTh}
        centered
        open={open}
        // onOk={() => setModal2Open(false)}
        onCancel={() => onCancel()}
        width={300}
      >
        <div className="flex justify-between gap-2">
          <DatePicker defaultValue={dayjs()} onChange={onDateChange} />
          <TimePicker
            defaultValue={dayjs()}
            onChange={onTimeChange}
            changeOnScroll
            needConfirm={false}
          />
        </div>
        <div className="my-2 flex justify-between gap-2">
          <DropdownItems items={items} />
          <InputNumber className="w-full" min={1} onChange={onChange} />
        </div>
        <TextArea rows={2} />
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
              <Card>
                <div className="h-full">
                  <BarChartComponent></BarChartComponent>
                  <PieChartComponent></PieChartComponent>
                </div>
              </Card>
            </div>
            <div className="w-full flex flex-col ">
              <div className="font-medium text-gray-500 ">เดือนที่ผ่านมา</div>
              <Card>
                <div className="h-full">
                  <BarChartComponent></BarChartComponent>
                  <PieChartComponent></PieChartComponent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <DialogTransection
        dropdowns={allTag}
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

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "January", sales: 4000 },
  { name: "February", sales: 3000 },
  { name: "March", sales: 2000 },
  // ...
];

const BarChartComponent = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        setSize({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={chartContainerRef}>
      <BarChart width={size.width} height={size.height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

import { PieChart, Pie } from "recharts";

const datas = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  // ...
];

const PieChartComponent = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        setSize({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div ref={chartContainerRef}>
      <PieChart width={size.width} height={size.height}>
        <Pie
          data={datas}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default HomePage;

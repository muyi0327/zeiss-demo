import React, { useEffect } from "react";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import { useImmer } from "use-immer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMachines,
  fetchListlAction,
} from "../store/slices/machines.slice";

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "类型",
    dataIndex: "machine_type",
    key: "machine_type",
  },
  {
    title: "安装日期",
    dataIndex: "install_date",
    key: "install_date",
  },
  {
    title: "最后保养日期",
    dataIndex: "last_maintenance",
    key: "last_maintenance",
  },
  {
    title: "坐标定位",
    dataIndex: "coordinate",
    key: "coordinate",
  },
  {
    title: "状态",
    dataIndex: "statusText",
    key: "statusText",
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link to={`/machines/${record.id}`}>查看</Link>
      </Space>
    ),
  },
];

const status = {
  finashed: "完成",
  idle: "闲置",
  running: "运行中",
  errored: "异常",
};

const colors = {
  finashed: "green",
  idle: "gray",
  running: "blue",
  errored: "red",
};

const Home = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectMachines);
  const [machines, setMachines] = useImmer([]);

  useEffect(() => {
    dispatch(fetchListlAction());
  }, [dispatch]);

  useEffect(() => {
    console.log(list);
    setMachines((draft) => {
      for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i];

        if (!draft[i] || item.status !== draft[i].status) {
          draft[i] = {
            ...item,
            key: item.id,
            index: i + 1,
            statusText: (
              <span style={{ color: colors[item.status] }}>
                {status[item.status]}
              </span>
            ),
            coordinate: `${item.longitude},${item.latitude}`,
          };
        }
      }
    });
  }, [list, setMachines]);

  return (
    <div>
      <Table
        pagination={{ pageSize: 20 }}
        dataSource={machines}
        columns={columns}
      ></Table>
    </div>
  );
};

export default Home;

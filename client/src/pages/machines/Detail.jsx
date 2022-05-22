import React, { useEffect, useState } from "react";
import { Table, Timeline } from "antd";
import { useImmer } from "use-immer";
import Styles from "../../assets/css/machines/detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetailAction,
  selectMachineDetail,
} from "../../store/slices/machines.slice";
import { useParams } from "react-router-dom";

const columns = [
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
];

const statusText = {
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

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector(selectMachineDetail);
  const [datas, setDatas] = useImmer([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(id);
    dispatch(fetchDetailAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(detail);
    if (detail) {
      setDatas((draft) => {
        if (detail) {
          let {
            id,
            machine_type,
            install_date,
            last_maintenance,
            longitude,
            latitude,
            status,
          } = detail;

          draft[0] = {
            key: id,
            machine_type,
            install_date,
            last_maintenance,
            coordinate: `${longitude},${latitude}`,
            statusText: statusText[status],
          };
        }
      });

      setEvents(detail.events);
    }
  }, [detail, setDatas]);

  return (
    <div className={Styles.machinesDetail}>
      <Table dataSource={datas} columns={columns} pagination={false}></Table>
      <section className={Styles.timeline}>
        {events.length > 0 && (
          <Timeline key="timeline">
            {events.map(({ id, status, timestamp }) => (
              <Timeline.Item key={id} color={colors[status]}>
                <p style={{ color: colors[status] }}>
                  状态:{statusText[status]}
                </p>
                <p>时间： {timestamp}</p>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </section>
    </div>
  );
};

export default Detail;

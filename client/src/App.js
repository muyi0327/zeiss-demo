import React, { lazy, Suspense, useRef, useLayoutEffect } from "react";
import { message } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateDetail, updateList } from "./store/slices/machines.slice";
import "./assets/css/App.css";
import Home from "./pages/Home";
const MachinesDetail = lazy(() => import("./pages/machines/Detail"));

function App() {
  const dispatch = useDispatch();
  const ws = useRef(null);

  //启动
  useLayoutEffect(() => {
    ws.current = new WebSocket("ws://localhost:3002");
    ws.current.onmessage = (e) => {
      let { data } = e;
      console.log(data);

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (error) {
          console.log(error);
        }
      }

      if (data.type === "update_machine") {
        dispatch(updateDetail(data.payload));
        dispatch(updateList(data.payload));
        message.success({
          content: (
            <span>
              机器{data.payload.machine_id}状态于
              <span style={{ color: "blue" }}>{data.payload?.timestamp}</span>
              刷新
            </span>
          ),
        });
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [ws, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/machines/:id"
            element={
              <Suspense fallback={<div>loading</div>}>
                <MachinesDetail />
              </Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

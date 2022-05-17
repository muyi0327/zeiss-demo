const MockJs = require("mockjs");

const status = ["idle", "running", "finashed", "errored"];
const types = ["Measurement machine", "Microscope"];

exports.list = () => {
  let list = MockJs.mock({
    code: 0,
    "data|20": [
      {
        "id|+1": 1,
        status: "@integer(0,3)",
        machine_type: "@integer(0,1)",
        "longitude|50-120.14": 1.23,
        "latitude|20-90.14": 1.23,
        last_maintenance:
          "@date()" + "T" + "@time()" + "." + "@datetime('T')" + "Z",
        install_date: "@date",
        floor: 5,
      },
    ],
  });

  list.data = list.data.map((item) => {
    item.id = `machines-id-${item.id}`;
    item.status = status[item.status];
    item.machine_type = types[item.machine_type];
    return item;
  });

  return list;
};

exports.detail = () => {
  let detail = MockJs.mock({
    code: 0,
    data: {
      status: "@integer(0,3)",
      machine_type: "@integer(0,1)",
      "longitude|50-120.14": 1.23,
      "latitude|20-90.14": 1.23,
      last_maintenance:
        "@date()" + "T" + "@time()" + "." + "@datetime('T')" + "Z",
      install_date: "@date()",
      floor: 5,
      "events|10": [
        {
          timestamp: "@date()" + "T" + "@time()" + "." + "@datetime('T')" + "Z",
          status: "@integer(0,3)",
        },
      ],
    },
  });

  detail.data.status = status[detail.data.status];
  detail.data.machine_type = types[detail.data.machine_type];
  detail.data.events = detail.data.events.map((evt) => {
    evt.status = status[evt.status];
    return evt;
  });

  return detail;
};

exports.refresh = () => {
  let data = MockJs.mock({
    data: {
      id: "@guid()",
      status: "@integer(0,3)",
      machine_id: "@integer(1,20)",
      timestamp: "@date()" + "T" + "@time()" + "." + "@datetime('T')" + "Z",
    },
  });

  data.data.machine_id = `machines-id-${data.data.machine_id}`;
  data.data.status = status[data.data.status];

  return data.data;
};

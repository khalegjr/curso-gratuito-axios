const statusEl = document.getElementById("status");
const dataEl = document.getElementById("data");
const headersEl = document.getElementById("headers");
const configEl = document.getElementById("config");

const config = {
  params: {
    _limit: 5,
  },
};

const get = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts", config)
    .then((response) => renderOutput(response));
};

const post = () => {
  const data = {
    title: "LaraVue",
    body: "Testando envio de dados",
    userId: 1,
  };
  axios
    .post("https://jsonplaceholder.typicode.com/posts", data)
    .then((response) => renderOutput(response));
};

const put = () => {
  const data = {
    id: 1,
    title: "LaraVue",
    body: "Alterando dados com PUT",
    userId: 1,
  };

  axios
    .put("https://jsonplaceholder.typicode.com/posts/1", data)
    .then((response) => renderOutput(response));
};

const patch = () => {
  const data = {
    title: "Alterando dados com Patch",
  };

  axios
    .patch("https://jsonplaceholder.typicode.com/posts/1", data)
    .then((response) => renderOutput(response));
};

const del = () => {
  axios
    .delete("https://jsonplaceholder.typicode.com/posts/2")
    .then((response) => renderOutput(response));
};

const multiple = () => {
  Promise.all([
    axios.get("https://jsonplaceholder.typicode.com/posts", config),
    axios.get("https://jsonplaceholder.typicode.com/users"),
  ]).then((response) => {
    renderOutput(response[0]);
    console.table(response[0].data);
    console.table(response[1].data);
  });
};

const transform = () => {
  config2 = {
    params: {
      _limit: 5,
    },
    transformResponse: [
      function (data) {
        const payload = JSON.parse(data).map((o) => {
          return {
            ...o,
            is_selected: false,
          };
        });
        return payload;
      },
    ],
  };
  axios
    .get("https://jsonplaceholder.typicode.com/posts", config2)
    .then((response) => renderOutput(response));
};

const errorHandling = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/postz")
    .then((response) => renderOutput(response))
    .catch((error) => {
      renderOutput(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.message);
    });
};

const cancel = () => {
  const controller = new AbortController();

  const config = {
    params: {
      _limit: 5,
    },
    signal: controller.signal,
  };
  axios
    .get("https://jsonplaceholder.typicode.com/posts", config)
    .then((response) => renderOutput(response))
    .catch((e) => console.log(e));

  controller.abort();
};

const clear = () => {
  statusEl.innerHTML = "";
  statusEl.className = "";
  dataEl.innerHTML = "";
  headersEl.innerHTML = "";
  configEl.innerHTML = "";
};

const renderOutput = (response) => {
  // Status
  const status = response.status;
  statusEl.removeAttribute("class");
  let statusElClass =
    "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium";
  if (status >= 500) {
    statusElClass += " bg-red-100 text-red-800";
  } else if (status >= 400) {
    statusElClass += " bg-yellow-100 text-yellow-800";
  } else if (status >= 200) {
    statusElClass += " bg-green-100 text-green-800";
  }

  statusEl.innerHTML = status;
  statusEl.className = statusElClass;

  // Data
  dataEl.innerHTML = JSON.stringify(response.data, null, 2);
  Prism.highlightElement(dataEl);

  // Headers
  headersEl.innerHTML = JSON.stringify(response.headers, null, 2);
  Prism.highlightElement(headersEl);

  // Config
  configEl.innerHTML = JSON.stringify(response.config, null, 2);
  Prism.highlightElement(configEl);
};

document.getElementById("get").addEventListener("click", get);
document.getElementById("post").addEventListener("click", post);
document.getElementById("put").addEventListener("click", put);
document.getElementById("patch").addEventListener("click", patch);
document.getElementById("delete").addEventListener("click", del);
document.getElementById("multiple").addEventListener("click", multiple);
document.getElementById("transform").addEventListener("click", transform);
document.getElementById("cancel").addEventListener("click", cancel);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("clear").addEventListener("click", clear);

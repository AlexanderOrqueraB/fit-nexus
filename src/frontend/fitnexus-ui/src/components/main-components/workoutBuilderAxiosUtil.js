//TODO: Example to get all, get by id and get by title
const get_id = useRef(null);
const get_title = useRef(null);

const [getResult, setGetResult] = useState(null);

const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

//TODO: Examples, not tested yet
async function getAllData() {
  try {
    const res = await apiClient.get('/test');
    //apiClient.get("/tutorials");

    const result = {
      status: res.status + '-' + res.statusText,
      headers: res.headers,
      data: res.data,
    };

    setGetResult(fortmatResponse(result));
  } catch (err) {
    setGetResult(fortmatResponse(err.response?.data || err));
  }
}
//TODO: Examples, not tested yet
async function getDataById() {
  const id = get_id.current.value;

  if (id) {
    try {
      const res = await apiClient.get('/test');
      //apiClient.get(`/tutorials/${id}`);

      const result = {
        data: res.data,
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
      };

      setGetResult(fortmatResponse(result));
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }
}

//TODO: Examples, not tested yet
async function getDataByTitle() {
  const title = get_title.current.value;

  if (title) {
    try {
      // const res = await instance.get(`/tutorials?title=${title}`);
      const res = await apiClient.get('/test');
      //apiClient.get("/tutorials", {
      //  params: {
      //  title: title,
      // },
      // });

      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setGetResult(fortmatResponse(result));
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }
}
//TODO: Examples, not tested yet
const clearGetOutput = () => {
  setGetResult(null);
};

//TODO example in return () <input type="text" ref={get_title} className="form-control ml-2" placeholder="Title" />
//  <div className="input-group-append">
//  <button className="btn btn-sm btn-primary" onClick={getDataByTitle}>Find By Title</button>
//  </div>

// <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>


  //TODO: Review createEmployee(employee){
    //        return apiClient.post(EMPLOYEE_API_BASE_URL, employee);
    //    }

    //TODO: Review example 1 getEmployeeById(employeeId){
    //        return apiClient.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    //    }

    //TODO: Review example 2 export const getProductById = async (id) => {
    //  try {
    //    const response = await apiClient.get(`${apiUrl}/${id}`);
    //    return response.data;
    //  } catch (error) {
    //    throw error;
    //  }
    //}
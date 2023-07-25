const MyComponent = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Make a GET request to the backend API
      axios.get('/api/users')
        .then((response) => {
          // Update the component state with the received data
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    return (
      <div>
        <h2>Users</h2>
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  export default MyComponent;

import './App.css';
import List from './components/List';
import { bigList } from './helper/helper';



function App() {
 

  const renderProfile = item => (
    <div style={{ display: "flex"}}>
      <img
        src={item.avatar}
        alt={item.name}
        width={50}
      />
      <p>{item.name} - {item.email}</p>
    </div>
  )

  return <List data={bigList} renderEmpty={<h1>No Users!</h1>} renderItem={renderProfile}/>;
}

export default App;

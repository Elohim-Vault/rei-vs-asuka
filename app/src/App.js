import logo from './logo.svg';
import './App.css';
import { Wallet } from './Wallet';
import GirlCard from './components/GirlCard';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <Wallet />
      </div>
      <div className='body'>
        <div className='title'>
          <h1>Rei ou Asuka?</h1>
          <p>
            It's time to settle an age old debate: What is the best kind of peanut butter?
            Cast your vote to the Solana blockchain and help decide this once and for all!
          </p>
          <p>To get started, connect your wallet.</p>
        </div>
        
        <div className='pool'>
          <GirlCard
            girlName="Rei Ayanami"
            img="https://i.gifer.com/CcgP.gif"
          />
          
          <GirlCard
            girlName="Asuka Langley"
            img="https://i.pinimg.com/originals/19/57/7b/19577b7c3415561879c7d7e797a99838.gif"
          />
        </div>

      </div>
    </div>
  );
}

export default App;

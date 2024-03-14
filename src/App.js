import {BrowserRouter, Link} from 'react-router-dom'

import PageContent from './components/routes/PageContent';
import Header from './components/Header';
import Footer from './components/Footer';





function App() {  

  return (
<BrowserRouter>
    <div className="App">
    
      <Header/>

      <PageContent />
      
      <Footer/>

    </div>
</BrowserRouter>
  );
}

export default App;

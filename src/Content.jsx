import Header from './Header';
import MainArea from './MainArea';
import Footer from './Footer';
import { useEffect } from 'react';
import { useAppContext } from './AppContext';


function Content() {

  const { setPage } = useAppContext();

  useEffect(() => {
    setPage('/');
  }, []);

  return (
    <div className='app'>
      <Header />
      <MainArea />
      <Footer />
    </div>
  );
}

export default Content;
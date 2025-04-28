import style from './page.module.scss';

// Components
import UserID from './_components/UserID/UserID';

const Home = () => {
  return (
    <main className={style.main}>
      <h1>Hello World</h1>
      <UserID />
    </main>
  );
};

export default Home;

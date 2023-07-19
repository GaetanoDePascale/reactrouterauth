import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('Home page');
  }, [setPageTitle, setPageSubtitle]);

  // function Person(firstName, lastName) {
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  // }

  // const persons = [
  //   new Person("John", "Doe"),
  //   new Person("Mario", "Rossi"),
  //   new Person("Andrea", "Bianchi"),
  //   new Person("Jane", "Smith")
  // ];

  // console.table(persons);

  // console.dir(document.location);

  // console.group("Log in fase di loading ...");
  // console.log('href:' + document.location.href);
  // console.log('sto caricando la pagina iniziale');
  // console.groupEnd();

  // console.clear();

  // console.debug('debug');
  // console.warn('warn');
  // console.info('info');
  // console.error('error');

  // console.groupEnd();

  // const errorMsg = "the # is not even";
  // for (let number = 2; number <= 5; number++) {
  //   console.log(`the # is ${number}`);
  //   console.assert(number % 2 === 0, "%o", { number, errorMsg });
  // }

  // console.trace();
  const fnA = (a, b) => a + b;
  const fnB = (a, b) => b + a;

  console.log('.');
  console.time("Start long running code");
  fnA(10, 20);
  console.timeEnd("Start long running code");
  console.time("Start long running code");
  fnB(10, 20);
  console.timeEnd("Start long running code");

  return <></>;
};

export default HomePage;

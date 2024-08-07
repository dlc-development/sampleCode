// import './App.css';
import SignIn from './views/Portal/SignIn';
import Edit from './views/Portal/Edit';
import Topnav from './components/Topnav';
import Offers from './views/Portal/Offers';
import Dashboard from './views/Portal/Dashboard';
import MyDocuments from './views/Portal/MyDocuments';
import New from './views/Portal/New';
import SignUp from './views/Portal/SignUp';
import StudentLoansLandingProdigy from './views/Portal/prodigy'; 
import StudentLoansLandingMpower from './views/Portal/mpower';
import StudentLoansLandingHDFC from './views/Portal/hdfc';
import StudentLoansLandingAvanse from './views/Portal/avanse';
import './css/mainStatic.css';
import './css/App.scss';
import './css/styles.scss';
import { PostHogProvider} from 'posthog-js/react'


function App() {

  const searchParams = new URLSearchParams(window.location.search);
  const offers = searchParams.get("offers")
  const sign_in = searchParams.get("sign_in")
  const sign_up = searchParams.get("sign_up")
  const dashboard = searchParams.get("dashboard")
  const mydocs = searchParams.get("mydocs")
  const edit = searchParams.get("edit")
  const edit2 = searchParams.get("edit2")
  const newApp = searchParams.get("new")
  const fromLanding = searchParams.get('fromLanding');
  const prodigy = searchParams.get('prodigy');
  const mpower = searchParams.get('mpower');
  const hdfc = searchParams.get('hdfc');
  const avanse = searchParams.get('avanse');

  //POST HOG options
  const options = {
    api_host: 'https://app.posthog.com',
  }
  if(sign_in){
    return (
      <PostHogProvider 
        apiKey='phc_p8SXHiBHZNGfzOznHWcRTVJNK8QrDYXVCgrVVuPf6Lb'
        options={options}
      >
        <div className="App">
          <Topnav />
          <SignIn />
        </div>
      </PostHogProvider>
    );
  }
  else if (offers){
    return(
      <div className="App">
        <Topnav loggedin={true}/>
        <Offers />
      </div>
    )
  } 
  else if (newApp){
    return(
      <div className="App">
        <Topnav loggedin={true}/>
        <New />
      </div>
    )
  } 
  else if (mydocs){
    return(
      <div className="App">
        <Topnav loggedin={true} />
        <MyDocuments />
      </div>
    )
    
  } 
  else if (dashboard){
    return(
      <div className="App">

        <Topnav loggedin={true} />
        <Dashboard />
      </div>
    )
    
  } 
  else if(edit) {
    return (
      <PostHogProvider
        apiKey='phc_p8SXHiBHZNGfzOznHWcRTVJNK8QrDYXVCgrVVuPf6Lb'
        options={options}
      >
        <div className="App">
          <Topnav loggedin={ fromLanding ? false : true} />
          <Edit />
        </div>
      </PostHogProvider>
    );
  }else if(edit2) {
    return (
      <PostHogProvider
        apiKey='phc_p8SXHiBHZNGfzOznHWcRTVJNK8QrDYXVCgrVVuPf6Lb'
        options={options}
      >
        <div className="App">
          <Topnav loggedin={ fromLanding ? false : true} />
          <Edit edit2={true} />
        </div>
      </PostHogProvider>
    );
  } 
  else if(prodigy) {
    return (
      <div className="App">
        <Topnav loggedin={ fromLanding ? false : true} />
        <StudentLoansLandingProdigy />
      </div>
    );
  } 
  else if(mpower) {
    return (
      <div className="App">
        <Topnav loggedin={ fromLanding ? false : true} />
        <StudentLoansLandingMpower />
      </div>
    );
  } 
  else if(hdfc) {
    return (
      <div className="App">
        <Topnav loggedin={ fromLanding ? false : true} />
        <StudentLoansLandingHDFC />
      </div>
    );
  } 
  else if(avanse) {
    return (
      <div className="App">
        <Topnav loggedin={ fromLanding ? false : true} />
        <StudentLoansLandingAvanse />
      </div>
    );
  } 
  
  else {
    return (
      <div className="App">
        <Topnav />
        <SignIn />
      </div>
    );
  }
  
}

export default App;

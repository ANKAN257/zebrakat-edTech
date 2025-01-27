import { BrowserRouter,Routes,Route } from "react-router-dom";


import BlogHomeComponent from './blog/BlogHomeComponent';
import Portfolio from './pages/Portfolio';

import AdminAbout from "./AdminPortfolio/AdminAbout";
import AdminProject from "./AdminPortfolio/AdminProject";
import AdminExp from './AdminPortfolio/AdminExp';

import AdminIntro from './AdminPortfolio/AdminIntro';
import AdminHome from './AdminPortfolio/AdminHome';
import AdminSkils from './AdminPortfolio/AdminSkils';

import AdminDSA from './AdminPortfolio/AdminDSA';
import DSAProblemComponent from './CodingResourses/courseField/BTech/DSAProblemComponent';
import AdminBlog from './AdminPortfolio/AdminBlog';
import BlogMainContentPage from './blog/blogpages/BlogMainContentPage';
// import MainHomePage from './MainHomePage';


import FirstMainpage from './pages/FirstMainpage';



import LogInPage from './auth/LogInPage'

import SignUpPage from './auth/SignInPage'







function App() {


 
  return (
    <BrowserRouter>
      
       <Routes>

       <Route path="/login" element={<LogInPage></LogInPage>}></Route>
       <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>

       
       {/* <Route path="/user/:username" element={<MainHomePage></MainHomePage>}></Route> */}
       <Route path="/" element={<FirstMainpage></FirstMainpage>}></Route>
       
    
        
           <Route path="/portfolio" element={<Portfolio></Portfolio>}></Route>
           
           <Route path="/blog" element={<BlogHomeComponent></BlogHomeComponent>}></Route>
           <Route path="/blog/:blogCategory/:read_more_route" element={<BlogMainContentPage ></BlogMainContentPage>}></Route>


           <Route path="/dsa-problems" element={<DSAProblemComponent></DSAProblemComponent>}></Route>
          
          
           <Route path="/admin" element={<AdminHome></AdminHome>} />
           <Route path="/admin-about" element={<AdminAbout></AdminAbout>}></Route>
           <Route path="/admin-project" element={<AdminProject></AdminProject>}></Route>
           <Route path="/admin-intro" element={<AdminIntro></AdminIntro>}></Route>
           <Route path="/admin-skills" element={<AdminSkils></AdminSkils>}></Route>
           <Route path="/admin-experience" element={<AdminExp></AdminExp>}></Route>
           <Route path="/admin-dsa-problems" element={<AdminDSA></AdminDSA>}></Route>
           <Route path="/admin-blog" element={<AdminBlog></AdminBlog>}></Route>

         


         
           



      </Routes>


    </BrowserRouter>
  );
}

export default App;

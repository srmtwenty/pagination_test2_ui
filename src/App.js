import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar1 from './components/Navbar1';
//import Navbar2 from './components/Navbar2';

import ArticleList from './pages/ArticleList';
import ArticlePost from './pages/articles/ArticlePost';
import ArticleDetail from './pages/articles/ArticleDetail';
import ArticleUpdate from './pages/articles/ArticleUpdate';

import ArtistList from './pages/ArtistList';
import ArtistPost from './pages/artists/ArtistPost';
import ArtistDetail from './pages/artists/ArtistDetail';
import ArtistUpdate from './pages/artists/ArtistUpdate';

import BroadcastList from './pages/Broadcast';
import BroadcastPost from './pages/broadcasts/BroadcastPost';
import BroadcastDetail from './pages/broadcasts/BroadcastDetail';
import BroadcastUpdate from './pages/broadcasts/BroadcastUpdate';

import CompetitionList from './pages/CompetitionList';
import CompetitionPost from './pages/competitions/CompetitionPost';
import CompetitionDetail from './pages/competitions/CompetitionDetail';
import CompetitionUpdate from './pages/competitions/CompetitionUpdate';

import ComposerList from './pages/ComposerList';
import ComposerPost from './pages/composers/ComposerPost';
import ComposerDetail from './pages/composers/ComposerDetail';
import ComposerUpdate from './pages/composers/ComposerUpdate';

import MusicList from './pages/MusicList';
import MusicPost from './pages/musics/MusicPost';
import MusicDetail from './pages/musics/MusicDetail';
import MusicUpdate from './pages/musics/MusicUpdate';

import NationalTeamList from './pages/NationalTeamList';
import NationalTeamDetail from './pages/nationalTeams/NationalTeamDetail';
import NationalTeamPost from './pages/nationalTeams/NationalTeamPost';
import NationalTeamUpdate from './pages/nationalTeams/NationalTeamUpdate';

import NationList from './pages/NationList';
import NationPost from './pages/nations/NationPost';
import NationDetail from './pages/nations/NationDetail';
import NationUpdate from './pages/nations/NationUpdate';

import PersonList from './pages/PersonList';
import PersonPost from './pages/people/PersonPost';
import PersonDetail from './pages/people/PersonDetail';
import PersonUpdate from './pages/people/PersonUpdate';

import RoutineList from './pages/RoutineList';
import RoutinePost from './pages/routines/RoutinePost';
import RoutineDetail from './pages/routines/RoutineDetail'; 
import RoutineUpdate from './pages/routines/RoutineUpdate';

import SoundtrackList from './pages/SoundtrackList';
import SoundtrackPost from './pages/soundtracks/SoundtrackPost';
import SoundtrackDetail from './pages/soundtracks/SoundtrackDetail';
import SoundtrackUpdate from './pages/soundtracks/SoundtrackUpdate';

import TagList from './pages/TagList';
import TagPost from './pages/tags/TagPost';
import TagDetail from './pages/tags/TagDetail';
import TagUpdate from './pages/tags/TagUpdate';

import UserList from './pages/UserList';
import UserPost from './pages/users/UserPost';
import UserDetail from './pages/users/UserDetail';
import UserUpdate from './pages/users/UserUpdate';

import RoleList from './pages/RoleList';
import RolePost from './pages/roles/RolePost';
import RoleDetail from './pages/roles/RoleDetail';
import RoleUpdate from './pages/roles/RoleUpdate';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar1/>
        <Routes>
          <Route path="/users" element={<UserList/>}/>
          <Route exact path="/users/create" element={<UserPost/>}/>
          <Route exact path="/users/:id" element={<UserDetail/>}/>
          <Route exact path="/users/:id/update" element={<UserUpdate/>}/>

          <Route path="/articles" element={<ArticleList/>}/>
          <Route exact path="/articles/create" element={<ArticlePost/>}/>
          <Route exact path="/articles/:id" element={<ArticleDetail/>}/>
          <Route exact path="/articles/:id/update" element={<ArticleUpdate/>}/>


          <Route path="/artists" element={<ArtistList/>}/>
          <Route exact path="/artists/create" element={<ArtistPost/>}/>
          <Route exact path="/artists/:id" element={<ArtistDetail/>}/>
          <Route exact path="/artists/:id/update" element={<ArtistUpdate/>}/>

          <Route path="/broadcasts" element={<BroadcastList/>}/>
          <Route exact path="/broadcasts/create" element={<BroadcastPost/>}/>
          <Route exact path="/broadcasts/:id" element={<BroadcastDetail/>}/>
          <Route exact path="/broadcasts/:id/update" element={<BroadcastUpdate/>}/>


          <Route path="/competitions" element={<CompetitionList/>}/>
          <Route exact path="/competitions/create" element={<CompetitionPost/>}/>
          <Route exact path="/competitions/:id" element={<CompetitionDetail/>}/>
          <Route exact path="/competitions/:id/update" element={<CompetitionUpdate/>}/>

          <Route path="/composers" element={<ComposerList/>}/>
          <Route exact path="/composers/create" element={<ComposerPost/>}/>
          <Route exact path="/composers/:id" element={<ComposerDetail/>}/>
          <Route exact path="/composers/:id/update" element={<ComposerUpdate/>}/>

          <Route path="/musics" element={<MusicList/>}/>  
          <Route exact path="/musics/create" element={<MusicPost/>}/>
          <Route exact path="/musics/:id" element={<MusicDetail/>}/>
          <Route exact path="/musics/:id/update" element={<MusicUpdate/>}/>

          <Route path="/nations" element={<NationList/>}/>
          <Route exact path="/nations/create" element={<NationPost/>}/>
          <Route exact path="/nations/:id" element={<NationDetail/>}/>
          <Route exact path="/nations/:id/update" element={<NationUpdate/>}/>

          <Route path="/nationalTeams" element={<NationalTeamList/>}/>
          <Route exact path="/nationalTeams/create" element={<NationalTeamPost/>}/>
          <Route exact path="/nationalTeams/:id" element={<NationalTeamDetail/>}/>
          <Route exact path="/nationalTeams/:id/update" element={<NationalTeamUpdate/>}/>

          <Route path="/people" element={<PersonList/>}/>
          <Route exact path="/people/create" element={<PersonPost/>}/>
          <Route exact path="/people/:id" element={<PersonDetail/>}/>
          <Route exact path="/people/:id/update" element={<PersonUpdate/>}/>

          <Route path="/roles" element={<RoleList/>}/>
          <Route exact path="/roles/create" element={<RolePost/>}/>
          <Route exact path="/roles/:id" element={<RoleDetail/>}/>
          <Route exact path="/roles/:id/update" element={<RoleUpdate/>}/>

          <Route path="/routines" element={<RoutineList/>}/>
          <Route exact path="/routines/create" element={<RoutinePost/>}/>
          <Route exact path="/routines/:id" element={<RoutineDetail/>}/>
          <Route exact path="/routines/:id/update" element={<RoutineUpdate/>}/>

          <Route path="/soundtracks" element={<SoundtrackList/>}/>
          <Route exact path="/soundtracks/create" element={<SoundtrackPost/>}/>
          <Route exact path="/soundtracks/:id" element={<SoundtrackDetail/>}/>
          <Route exact path="/soundtracks/:id/update" element={<SoundtrackUpdate/>}/>

          <Route path="/tags" element={<TagList/>}/>
          <Route exact path="/tags/create" element={<TagPost/>}/>
          <Route exact path="/tags/:id" element={<TagDetail/>}/>
          <Route exact path="/tags/:id/update" element={<TagUpdate/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;

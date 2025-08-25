import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
function SubHeader(props) {
  const history = useHistory();

  const goBack = () => {
    history.goBack(); // This will take you back to the previous page
  };
  return (

      <div className="header">
  <div className="header-content">
    <div className="back-button" onClick={() => goBack()}>
      <i className="fas fa-arrow-left" />
    </div>
    <div className="page-title">{props?.title}</div>
    <div className="header-icons">
      <Link to="/notification" > 
      <i className="fas fa-bell header-icon" />
      </Link>
    </div>
  </div>
</div>



  );
}
export default SubHeader;

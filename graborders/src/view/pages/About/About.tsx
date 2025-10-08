import React, { useEffect } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import actions from 'src/modules/company/list/companyListActions'
import selectors from 'src/modules/company/list/companyListSelectors' 
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "src/shared/LoadingModal";

function About() {
  const dispatch = useDispatch();

  const record = useSelector(selectors.selectRows); 
  const loading = useSelector(selectors.selectLoading);

  const doFetch = () => { 
    dispatch(actions.doFetch());
  };

  useEffect(() => {
    doFetch();
  }, [dispatch]);

  return (
    <div className="container">
      <SubHeader title="About Us" path="/" />
      <div className="detaill__company" style={{ whiteSpace: 'pre-line' }}>
        {loading && <LoadingModal />}
        {!loading && record && record[0]?.companydetails && (
          <p dangerouslySetInnerHTML={{ __html: record[0]?.companydetails }} />
        )}
      </div>
    </div>
  );
}

export default About;
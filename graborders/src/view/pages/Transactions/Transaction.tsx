import SubHeader from "src/view/shared/Header/SubHeader";
import { Rating } from "react-simple-star-rating";
import Message from "src/view/shared/message";



function Transaction() {


  const submit=()=>{ 
    Message.success("Thank you for your rating! We appreciate your feedback!");
  }


  return (
    <div>
      <SubHeader title="Rate US" path="/profile" />

      <div className="app__rating">
      <div className="transaction__content __contant">
        <Rating />
      </div>

      <div className="submit__button">
        <div className="button__confirm" onClick={() => submit()}> Submit</div>
      </div>
      </div>
    </div>
  );
}

export default Transaction;

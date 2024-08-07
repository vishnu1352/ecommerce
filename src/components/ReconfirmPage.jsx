import React from "react";
import { MdCurrencyRupee, MdOutlineArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ReconfirmPage.scss";
import { Button } from "react-bootstrap";
import sendRequestFunc from "../utils/sendRequestFunc";
import { BASEURL } from "../utils/URL";

const ReconfirmPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.reconfirmState;
  console.log(data)
  const placeOrder = async () => {
    let response = await sendRequestFunc(`${BASEURL}/placeOrder`, "POST", data);
    if (response.statusCode === 200) {
      toast.success(response.message + "Please wait you will be redirected to Whatsapp");
      let choosenColor =
        data.selectedColor === "" ? "transparent" : data.selectedColor;

      let redirecturl =
        "https://api.whatsapp.com/send?phone=9849888788&text=%0aID : " +
        data.sno +
        "%0a Selected Letter : " +
        data.letter.toUpperCase() +", "+data.type.toUpperCase()+
        "%0a Name to be mentioned on item : " +
        data.nameOnItem +
        "%0a Selected Color : " +
        choosenColor +
        "%0aCustomizations : " +
        data.remarks +
        "%0a%0a*ADDRESS*%0a--------------------------------%0aName of Customer : " +
        data.name +
        "%0a Price : " +
        data.itemPrice +
        " %2B shipping %0a Phone : " +
        data.phone +
        "%0a Address : " +
        data.address +
        "%0a District : " +
        data.district +
        "%0a %0a UPI ID :  9849888788-2@ybl %0a Registered Name : Vutukuru Radhika %0a %0a 📍 radhikaworks.netlify.app %0a %0a" +
        "*Thank you for choosing us, kindly please process the payment at earliest and share us the screenshot. We will keep you updated on the status of the product.*%0a%0a" +
        "*You Will Get You Order With In 10 to 15 Days. Thank You For You Patience*" +
        "%0a😃 😃 😃🤝🤝🤝🤝🤝😃 😃 😃";
      setTimeout(() => {
        window.location.href = redirecturl;
      }, 1000);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="reconfirmpage">
        <div className="d-flex gap-2 p-3 reconfirmheader ">
          <div onClick={() => navigate(-1)}>
            <MdOutlineArrowBack />
          </div>
          <div className="fw-bold">Reconfirmation</div>
        </div>
        <div className="d-flex gap-3 align-items-center p-3">
          <div>
            <img
              src={data.image}
              alt={data.letter}
              width="50px"
              className="rounded reconfirmimage"
            />
          </div>
          <div>
            <p className="m-0 fw-bold">
              <MdCurrencyRupee />
              {data.itemPrice}
              <span className="fs-12">+shipping</span>
            </p>
          </div>
        </div>
        <div className="mt-3 px-3 fs-14">
        <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">Order Id : </div>
            <div>{data.sno}</div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">Selected Letter : </div>
            <div>{`${data.letter}, ${data.type}`}</div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">Name On Item (optional) : </div>
            <div>{data.nameOnItem}</div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">Selected Color : </div>
            <div>{data.selectedColor}</div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">Customizations : </div>
            <div>{data.remarks}</div>
          </div>

          <div className="fs-18 fw-bold mt-3">Address</div>
          <hr />

          <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">Name : </div>
            <div>{data.name}</div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">Phone : </div>
            <div>{data.phone}</div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">Address : </div>
            <div>{data.address}</div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <div className="fw-bold">District : </div>
            <div>{data.district}</div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2 fs-14  p-3">
          <Button
            variant="secondary"
            className="fs-14"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            className="fs-12 placeorderbutton"
            onClick={() => {
              placeOrder();
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReconfirmPage;

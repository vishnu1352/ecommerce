import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import sendRequestFunc from "../../../utils/sendRequestFunc";
import { BASEURL } from "../../../utils/URL";
import { useNavigate } from "react-router-dom";

const ViewInventory = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate()

  const getAllItems = async () => {
    const response = await sendRequestFunc(`${BASEURL}/getAllItems`, "GET");
    if (response.statusCode === 200) {
      setItems(response.allItems);
    }
  };

  const redirectToEdit = (id)=>{
    navigate('/editinventory',{state:{id:id}})
  }
  const deleteItem =async(id)=>{
    const response = await sendRequestFunc(`${BASEURL}/deleteItem/${id}`,'POST',{})
    if(response.statusCode === 200){
        window.location.reload();
    }
  }


  useEffect(() => {
    getAllItems();
  }, []);
  return (
    <>
      <div className="p-3">
        {items.map((item) => {
          return (
            <div className="d-flex justify-content-between align-items-center p-3 border border-secondary rounded my-3" >
              <div>
                <img src={item.imageUrl} alt="" style={{ width: "100px" }} />
              </div>
              <div>
                <p className="m-0">{item.price}</p>
              </div>
              <div>{item.type}</div>
              <div>
                <Dropdown size="sm" style={{"background":"none","border":"none"}}>
                  <Dropdown.Toggle >
                   
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>redirectToEdit(item._id)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={()=>deleteItem(item._id)}>
                      Delete
                    </Dropdown.Item>
                    
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewInventory;

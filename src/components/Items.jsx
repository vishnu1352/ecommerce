import React, { useEffect, useRef, useState } from "react";
import { MdCurrencyRupee, MdFilterListAlt } from "react-icons/md";
import Popup from "./Popup";
import Header from "./Header";
import Modalcomponent from "./Modalcomponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { ItemsFromApi } from "../utils/ItemsFromApi";
import "./Items.scss";
import { useNavigate } from "react-router-dom";

const Items = ({ itemType }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemForModal, setItemForModal] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showSno, setShowSno] = useState(false);
  const [sortedItemsList, setSortedItemsList] = useState([]);
  const [originalItemsList, setOriginalItemsList] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedSortByType, setSelectedSortByType] = useState([]);
  const uniqueItemTypesRef = useRef([]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleFilterModal = () => {
    setShowFilterModal((prev) => !prev);
  };

  const handleCheckboxChange = (letter) => {
    setSelectedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  const filteredItems = sortedItemsList.filter((item) => {
    if (
      selectedLetters.length === 0 ||
      selectedLetters.includes(item.letter.toUpperCase())
    ) {
      return item;
    }
    return false;
  });

  const getAllItems = async () => {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await ItemsFromApi(itemType);
        if (response) {
          setOriginalItemsList(response.reverse());

          // Set unique item types
          uniqueItemTypesRef.current = [
            ...new Set(response.map((item) => item.type)),
          ];
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        reject(error);
      }
    });

    toast.promise(myPromise, {
      pending: "Loading Items",
      success: "Items Loaded",
      error: "Error Occured",
    });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    const itemsFilteredByType = originalItemsList.filter(
      (item) =>
        selectedSortByType.length === 0 ||
        selectedSortByType.includes(item.type)
    );
    setSortedItemsList(itemsFilteredByType);
  }, [selectedSortByType, originalItemsList]);

  const sortBy = (sortby) => {
    const sorted = [...sortedItemsList].sort((a, b) => {
      if (sortby === "hl") {
        return b.price - a.price; // High to Low
      }
      if (sortby === "lh") {
        return a.price - b.price; // Low to High
      }
      return 0;
    });
    setSortedItemsList(sorted);
    setSelectedSort(sortby);
  };

  const filterByType = (type) => {
    setSelectedSortByType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleItemClick = (item) => {
    setItemForModal(item);
    toggleModal();
  };

  return (
    <>
      <Header>
        <p
          className="m-0 p-3 text-center fs-18"
          onDoubleClick={() => navigate("/login")}
        >
          Radhika Works
        </p>
        <p
          className="menuicon m-0 p-3"
          onClick={toggleFilterModal}
          style={{ cursor: "pointer" }}
        >
          <MdFilterListAlt />
        </p>
      </Header>
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="itemsdiv my-4">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              className="itemcontainer"
              onClick={() => handleItemClick(item, index + 1)}
              key={item._id} // Use a unique identifier
            >
              <div>
                <img src={item.imageUrl} alt="keychain" className="image" />
              </div>
              <div className="mx-3 mt-2 price">
                <div>
                  <MdCurrencyRupee /> {item.price}
                </div>
                <span className="fs-10">+shipping</span>
              </div>
              <div className="fs-10 d-flex justify-content-center">
                click on image to order
              </div>
              {showSno && (
                <div className="fs-10 d-flex justify-content-center">
                  {index + 1}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczO63fbtt-z8KWCPO2kXnKjhuiKKJbUPXtcC5Mq3VTOjp8XqnJPBsGBgoitFubiL5RQcpcDIrJl7H5vFVlvNl1TFOZzEqlhURmaou0sX7dUv7E8xufCD=s250-p-k"
              alt="No Results Found"
            />
          </div>
        )}

        {showModal && (
          <Popup
            toggle={showModal}
            toggleModal={toggleModal}
            data={itemForModal}
          />
        )}
        {showFilterModal && (
          <Modalcomponent show={showFilterModal} onHide={toggleFilterModal}>
            <p className="fs-18">
              <b
                onClick={() => {
                  setShowSno((prev) => !prev);
                  setShowFilterModal((prev) => !prev);
                }}
              >
                Sort By Price
              </b>
            </p>
            <div className="d-flex gap-2 border-bottom-1">
              <div
                onClick={() => sortBy("hl")}
                className={
                  selectedSort === "hl"
                    ? "sort-selected fs-12"
                    : "sort-disabled fs-12"
                }
              >
                High to low
              </div>
              <div
                onClick={() => sortBy("lh")}
                className={
                  selectedSort === "lh"
                    ? "sort-selected fs-12"
                    : "sort-disabled fs-12"
                }
              >
                Low to High
              </div>
            </div>

            <div className="divider my-3"></div>

            <p className="fs-18">
              <b>Filter By Letter</b>
            </p>

            <div className="d-flex gap-2 flex-wrap">
              {Array.from({ length: 26 }, (_, i) => (
                <div
                  key={String.fromCharCode(65 + i)} // Added unique key
                  value={String.fromCharCode(65 + i)}
                  onClick={() =>
                    handleCheckboxChange(String.fromCharCode(65 + i))
                  }
                  className={
                    selectedLetters.includes(String.fromCharCode(65 + i))
                      ? "letter-selected d-flex justify-content-center align-items-center fs-10"
                      : "letter-disabled d-flex justify-content-center align-items-center fs-10"
                  }
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>

            <div className="divider my-3"></div>
            <p className="fs-18">
              <b>Filter By Type</b>
            </p>
            <div className="d-flex gap-2 flex-wrap">
              {uniqueItemTypesRef.current.map((type, index) => (
                <div
                  key={type} // Added unique key
                  onClick={() => filterByType(type)}
                  className={
                    selectedSortByType.includes(type)
                      ? "sort-selected fs-12"
                      : "sort-disabled fs-12"
                  }
                >
                  {type}
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end">
              <Button onClick={toggleFilterModal} className="fs-12">
                Close
              </Button>
            </div>
          </Modalcomponent>
        )}
      </div>
    </>
  );
};

export default Items;

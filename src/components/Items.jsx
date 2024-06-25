import React, { useEffect, useRef, useState } from "react";
import { itemslist } from "../utils/Itemslist";
import "./Items.scss";
import { MdCurrencyRupee, MdFilterListAlt } from "react-icons/md";
import Popup from "./Popup";
import Header from "./Header";
import Modalcomponent from "./Modalcomponent";
import { Button } from "react-bootstrap";
import sendRequestFunc from "../utils/sendRequestFunc";

const Items = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemForModal, setItemForModal] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showSno, setShowSno] = useState(false);
  const [sortedItemsList, setSortedItemsList] = useState(
    [...itemslist].reverse()
  );
  const [originalItemsList] = useState([...itemslist].reverse());
  const [selectedSort, setSelectedSort] = useState(""); // State to track selected sorting option
  const [selectedSortByType, setSelectedSortByType] = useState([]);
  const uniqueItemTypesRef = useRef(null);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(true);
  };

  const handleCheckboxChange = (letter) => {
    setSelectedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  // const handleCheckboxChange = (letter) => {
  //   setSelectedLetters((prev) => {
  //     const newSet = new Set(prev);
  //     if (newSet.has(letter)) {
  //       newSet.delete(letter);
  //     } else {
  //       newSet.add(letter);
  //     }
  //     return Array.from(newSet);
  //   });
  // }

  const filteredItems = sortedItemsList.filter((item) => {
    if (
      selectedLetters.length === 0 ||
      selectedLetters.includes(item.letter.toUpperCase())
    ) {
      return item;
    }
    return false; // Added to satisfy the array filter function's requirement for a boolean return
  });

  let itemTypeArrayWithDuplicates = [];
  originalItemsList.forEach((item, index) => {
    itemTypeArrayWithDuplicates.push(item.type);
  });
  uniqueItemTypesRef.current = [...new Set(itemTypeArrayWithDuplicates)];


  const handleItemClick = (item) => {
    setItemForModal(item);
    toggleModal();
  };

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

  useEffect(() => {
    const itemsFilteredByType = originalItemsList.filter((item) => {
      return (
        selectedSortByType.length === 0 ||
        selectedSortByType.includes(item.type)
      );
    });
    setSortedItemsList(itemsFilteredByType);
  }, [selectedSortByType]);
  // Assuming originalItemsList, selectedSortByType, and sortedItemsList are defined somewhere in your component's state.

  return (
    <>
      <Header>
        <p
          className="menuicon m-0 p-3"
          onClick={() => toggleFilterModal()}
          style={{ cursor: "pointer" }}
        >
          <MdFilterListAlt />
        </p>
      </Header>
      <div className="itemsdiv my-4">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              className="itemcontainer"
              onClick={() => handleItemClick(item)}
              sno={item.sno}
              key={item.id} // Use a unique identifier if available
            >
              <div>
                <img src={item.imageurl} alt="keychain" className="image" />
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
                  {item.sno}
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
          <Modalcomponent
            show={showFilterModal}
            onHide={() => setShowFilterModal((prev) => !prev)}
          >
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
                  value={String.fromCharCode(65 + i)}
                  onClick={() =>
                    handleCheckboxChange(String.fromCharCode(65 + i))
                  }
                  className={
                    selectedLetters.indexOf(String.fromCharCode(65 + i)) > -1
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
              {uniqueItemTypesRef.current &&
                uniqueItemTypesRef.current.map((type, index) => {
                  return (
                    <div
                      onClick={() => {
                        filterByType(type);
                      }}
                      className={
                        selectedSortByType.includes(type)
                          ? "sort-selected fs-12"
                          : "sort-disabled fs-12"
                      }
                    >
                      {type}
                    </div>
                  );
                })}
            </div>
            <div className="d-flex justify-content-end">
              <Button onClick={()=>setShowFilterModal((prev) => !prev)} className="fs-12">Close</Button>
            </div>
          </Modalcomponent>
        )}
      </div>
    </>
  );
};

export default Items;

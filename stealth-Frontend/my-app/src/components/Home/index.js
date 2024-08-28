// src/components/Home/index.js
import React, { Component } from "react";
import { CgZoomIn } from "react-icons/cg";
import "./index.css";
import ApplianceItem from '../ApplianceItem';
import VendorCard from '../VendorCard';
import Footer from '../Footer';

// Appliances array
const appliancesArray = [
  {
    name: "Fridge",
    description: "A household appliance used to store and preserve food by keeping it cool.",
  },
  {
    name: "Air Conditioner",
    description: "A device that cools down and dehumidifies indoor air, improving comfort during hot weather.",
  },
  {
    name: "Television",
    description: "An electronic device used for watching video content, including broadcasts, streaming, and gaming.",
  },
  {
    name: "Gas Stove",
    description: "A cooking appliance powered by gas, used for heating and cooking food.",
  },
  {
    name: "Washing Machine",
    description: "A home appliance used to wash laundry automatically, saving time and effort.",
  },
  {
    name: "Microwave Oven",
    description: "An electric appliance that heats and cooks food using microwave radiation.",
  },
];

class Home extends Component {
  state = {
    locationList: [],
    locationData: {},
    locationVal: "Pune",
    availableTown: "Pune, Nashik, Aurangabad",
    searchData: "",
    suggestionList: [], // Stores all suggestions
    filteredSuggestions: [], // Stores suggestions filtered by search
    vendors: [], // Stores vendor data
    originalVendors: [], // Stores the original list of vendors
    isLoadingVendors: true,
    errorVendors: null,
  };

  componentDidMount() {
    this.getLocations();
    this.getAppliances();
    this.getVendors();
  }

  getAppliances = async () => {
    const url = "http://localhost:3001/appliances/";
    const options = { method: "GET" };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        this.setState({ suggestionList: data });
      }
    } catch (error) {
      console.error("Error fetching appliances:", error);
    }
  };

  getLocations = async () => {
    const url = "http://localhost:3001/locations/";
    const options = { method: "GET" };
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const uniqueLocations = new Set(data.map((item) => item.location));
      this.setState({ locationList: Array.from(uniqueLocations), locationData: data });
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  getVendors = async () => {
    const url = "http://localhost:3001/featured-technicians/";
    const options = { method: "GET" };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        this.setState({ vendors: data, originalVendors: data, isLoadingVendors: false });
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      this.setState({ errorVendors: error.message, isLoadingVendors: false });
    }
  };

  selectArea = (event) => {
    const { locationData } = this.state;
    const selectedLocation = locationData.find((item) => item.location === event.target.value);
    if (selectedLocation) {
      this.setState({
        locationVal: selectedLocation.location,
        availableTown: selectedLocation.availableTown,
      });
    }
  };

  searchStore = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const { suggestionList } = this.state;
    const filteredSuggestions = suggestionList.filter((item) =>
      item.name?.toLowerCase().includes(searchValue) // Added optional chaining here
    );
    this.setState({ searchData: searchValue, filteredSuggestions });
  };

  handleSuggestionClick = (suggestion) => {
    this.setState({ searchData: suggestion.name, filteredSuggestions: [] });
  };

  handleSearch = () => {
    const { searchData, locationVal, originalVendors } = this.state;

    // Check if searchData is empty, if so, return all vendors
    if (searchData.trim() === "") {
      this.setState({ vendors: originalVendors });
      return;
    }

    // Filter vendors based on searchData and locationVal
    const filteredVendors = originalVendors.filter((vendor) => {
      // Ensure that vendor.repairingItems is defined and is a string
      const repairingItemsArray = vendor.repairingItems ? vendor.repairingItems.split(", ") : [];

      // Check if searchData matches any item in repairingItemsArray and location matches
      return (
        repairingItemsArray.some(item =>
          item.toLowerCase().includes(searchData.toLowerCase())
        ) &&
        vendor.location === locationVal
      );
    });

    this.setState({ vendors: filteredVendors });
  };

  render() {
    const { locationList, locationVal, availableTown, searchData, filteredSuggestions, vendors, isLoadingVendors, errorVendors } = this.state;
    const availableTownArr = availableTown.split(",");

    return (
      <div>
        <nav className="navbar">
          <img
            src="https://res.cloudinary.com/dx97khgxd/image/upload/v1724784364/Screenshot_2024_0828_001335-removebg-preview_g4iwbn.png"
            alt="Stealth"
            className="stealth-logo"
          />

          <div className="login-btns">
            <button className="biz-btn">Biz Login</button>
            <button className="user-btn">Login</button>
          </div>
        </nav>

        <div className="selection-page">
          <div className="intro-head">
            <p className="home-para1">Take care of your home needs now!</p>
            <p className="home-para2">
              ServicePro is your one-stop solution to troubleshoot, choose a vendor and book a
              technician.
            </p>
            <div className="select-itemsss">
              <select onChange={this.selectArea} className="select-item" value={locationVal}>
                {locationList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div className="areas-list">
                <p className="para-areas">
                  {availableTownArr.length >= 3
                    ? `Only in ${availableTownArr[0]}, ${availableTownArr[1]} & ${availableTownArr[2]}`
                    : availableTownArr.join(", ")}
                </p>
              </div>
            </div>

            <div>
              <div className="searching">
                <div className="search-container">
                  <CgZoomIn className="zoom-in" />
                  <input
                    type="search"
                    value={searchData}
                    onChange={this.searchStore}
                    placeholder="Search Home Appliances"
                    autoComplete="off"
                    className="search-input"
                  />
                  {filteredSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {filteredSuggestions.map((item, index) => (
                        <li key={index} onClick={() => this.handleSuggestionClick(item)}>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button onClick={this.handleSearch} className="search-btn">
                  Search
                </button>
              </div>
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dx97khgxd/image/upload/v1724834768/Frame_dt1jj9.jpg"
            alt="profile-img"
            className="p-img1"
          />
        </div>

        <div className="itemsss">
          <h1>All Services</h1>
          <p>The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
          <ul className="width-list">
            {appliancesArray.map((item) => (
              <ApplianceItem eachItem={item} key={item.name} />
            ))}
          </ul>
        </div>

        <div className="detials-div">
          <img src="https://res.cloudinary.com/dx97khgxd/image/upload/v1724839488/Group_3609_vtth3z.png" alt="detials" className="details"/>
        </div>

        <div className="featured-vendors">
          <h2>Featured Vendors</h2>
          
          {isLoadingVendors ? (
            <p>Loading vendors...</p>
          ) : errorVendors ? (
            <p>Error fetching vendors: {errorVendors}</p>
          ) : vendors.length > 0 ? (
            <div className="vendors-container">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <p>No vendors available</p>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;

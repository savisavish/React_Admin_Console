import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/common/filter-popup.css'

const Filter_popup = ({ handleClose }) => {
  const [icons, setIcons] = useState({
    Job_searchIcon: true,
    Job_closeIcon: false,
    Job_searchInput: false,
    Ent_searchIcon: true,
    Ent_closeIcon: false,
    Ent_searchInput: false
  });

  const hideJobSearchInput = () => {
    setIcons({ ...icons, closeIcon: true });
  };
  const hideJobCloseIcon = () => {
    setIcons({ ...icons, Job_searchIcon: true, Job_closeIcon: false, Job_searchInput: false });
    clearFilters();
  };
  const showJobSearchInput = () => {
    setIcons({ ...icons, Job_searchIcon: false, Job_closeIcon: true, Job_searchInput: true });
  };
  const hideEntSearchInput = () => {
    setIcons({ ...icons, closeIcon: true });
  };
  const hideEntCloseIcon = () => {
    setIcons({ ...icons, Ent_searchIcon: true, Ent_closeIcon: false, Ent_searchInput: false });
    clearFilters();
  };
  const showEntSearchInput = () => {
    setIcons({ ...icons, Ent_searchIcon: false, Ent_closeIcon: true, Ent_searchInput: true });
  };
  const [jobfunction, setJobFunction] = useState([]);
  const [entitlement, setEntitlement] = useState([]);
  const [totalJobFunction, setTotalJobFunction] = useState(0);
  const [status, setStatus] = useState([]);
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const result = await axios.get('http://localhost:3031/adminconsolefilters');
        if (result.data && result.data.usertabfilter) {
          const { jobfunction, entitlement, status } = result.data.usertabfilter;
          if (jobfunction) {
            setJobFunction(jobfunction);
            setTotalJobFunction(jobfunction.length); // Update totalJobFunction with the length of jobfunction
          }
          if (entitlement) setEntitlement(entitlement);
          if (status) setStatus(status);
        } else {
          console.error('usertabfilter or its properties are undefined');
        }
      } catch (error) {
        console.error('Error loading filters:', error);
      }
    };

    loadFilters();
  }, []);
  const [visibleLabels, setVisibleLabels] = useState(8);
  const handleShowMore = () => {
    setVisibleLabels(visibleLabels + totalJobFunction);
  };
  const handleShowLess = () => {
    setVisibleLabels(8); // Reset visible labels to 20
  };
  /***Calendar Function***/
  const [lrError, setLRError] = useState({
    loginError_1: false,
    loginError_2: false,
    LoginError_3: false,
    regError_1: false,
    regError_2: false,
    regError_3: false
  });

  const disableUsersTabFutureDates = () => { };
  const checkUsersTabFutureDate = () => { };

  /***Calendar Function***/
  /***Checkbox Function***/
  const [checkedValues, setCheckedValues] = useState({});

  function handleCheckboxChange(e) {
    const { value } = e.target;
    setCheckedValues(prevcheckedValues => ({
      ...prevcheckedValues,
      [value]: !prevcheckedValues[value] // Toggle the checked state for the checkbox value
    }));
  }

  function isDisabled() {
    return Object.values(checkedValues).every(checked => !checked); // Check if all checkcheckedValues are unchecked
  }
  function userFilterClearAll() {
    setCheckedValues({}); // Clear all checked checkcheckedValues
  }
  /***Checkbox Function***/
  /***Search Function***/
  const [filterQuery, setFilterQuery] = useState('');
  const handleSearchInputChange = (event) => {
    const query = event.target.value.trim();
    if (query.length >= 3 || query === '') {
      setFilterQuery(query.toLowerCase());
    }
    if (query.length < 3) {
      clearFilters();
    }
  };
  const clearFilters = () => {
    setCheckedValues({}); // Clear all checked checkboxes
    setFilterQuery(''); // Clear the filter query
  };
  /***Search Function***/

  return (
    <div className="filter-popup is-visible" role="alert">
      <div className="filter-popup-container">
        <div className="filter-popup-header">
          <h6>Filters</h6>
          <a onClick={userFilterClearAll}>CLEAR ALL</a>
        </div>
        <div className="job-function filter-section">
          <div className="filtersearchicon">
            <h6>JOB FUNCTION</h6>
            {
              icons.Job_searchIcon &&
              <span className="jobfsearch">
                <img className="searchicon" alt="" onClick={showJobSearchInput} />
              </span>
            }
            {icons.Job_searchInput && <span className="jobfsearchclose" id="jobfsearchclose"><input id="JobFunctionInput" type="text" name="jobfunction" placeholder="SEARCH BY JOB FUNCTION" spellCheck="false" onChange={handleSearchInputChange} /><img className="eclose closeicon" alt="" onClick={hideJobCloseIcon} /></span>}
          </div>
          <div className="filter-options" id="jobFunctionSearch">
            {/* Render jobfunction filters */}
            {jobfunction
              .filter(filter => filter.toLowerCase().includes(filterQuery))
              .slice(0, visibleLabels)
              .map((filter, index) => (
                <label key={index} htmlFor="">
                  <input
                    type="checkbox"
                    name="filtercheckbox"
                    value={filter}
                    onChange={handleCheckboxChange}
                    checked={!!checkedValues[filter]}
                  />
                  <span>{filter}</span>
                </label>
              ))}

            {/* Display "Show More" button if there are more labels to show */}
            {visibleLabels < jobfunction.filter(filter => filter.toLowerCase().includes(filterQuery)).length && (
              <button onClick={handleShowMore}>+20 More</button>
            )}
            {visibleLabels > 20 && (
              <button onClick={handleShowLess}>See Less</button>
            )}
          </div>
        </div>
        <div className="entitlement filter-section">
          <div className="filtersearchicon">
            <h6>ENTITLEMENT</h6>
            {icons.Ent_searchIcon && <span className="jobfsearch"><img className="searchicon" alt="" onClick={showEntSearchInput} /></span>}
            {icons.Ent_searchInput && <span className="jobfsearchclose" id="jobfsearchclose"><input id="JobFunctionInput" type="text" name="jobfunction" placeholder="SEARCH BY ENTITLEMENT" spellCheck="false" onChange={handleSearchInputChange} /><img className="eclose closeicon" alt="" onClick={hideEntCloseIcon} /></span>}
          </div>
          <div className="filter-options" id="entitlementsearch">
            {/* Render entitlement filters */}
            {/* {entitlement.map((filter, index) => (
              <label key={index} htmlFor="">
                <input type="checkbox" name="filtercheckbox" value={filter} onChange={handleCheckboxChange} checked={!!checkedValues[filter]} />
                <span>{filter}</span>
              </label>
            ))} */}
            {entitlement
              .filter(filter => filter.toLowerCase().includes(filterQuery))
              .slice(0, visibleLabels)
              .map((filter, index) => (
                <label key={index} htmlFor="">
                  <input
                    type="checkbox"
                    name="filtercheckbox"
                    value={filter}
                    onChange={handleCheckboxChange}
                    checked={!!checkedValues[filter]}
                  />
                  <span>{filter}</span>
                </label>
              ))}
          </div>
        </div>

        <div className="active filter-section">
          <h6>ACTIVE</h6>
          <div className="active-checkbox filter-options" id="statussearch">
            {/* Render status filters */}
            {status.map((filter, index) => (
              <label key={index} htmlFor="">
                <input type="checkbox" name="filtercheckbox" value={filter} onChange={handleCheckboxChange} checked={!!checkedValues[filter]} />
                <span>{filter}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="date-selector-section filter-section">
          <div className="last-login" id="lastlogindate">
            <h6>LAST LOGIN</h6>
            <div className="filterlogindates input-group date">
              <span>From</span><input type="date" name="filterdate" max="9999-12-31" className="current-date" id="loginFromDate" data-date-format="DD/MMMM/YYYY" onClick={disableUsersTabFutureDates} onInput={checkUsersTabFutureDate} />
              <span className="dateto">To</span><input type="date" name="filterdate" max="9999-12-31" className="current-date" id="loginToDate" data-date-format="DD/MMMM/YYYY" onClick={disableUsersTabFutureDates} onInput={checkUsersTabFutureDate} />
            </div>
            <div className="dateserrormessages">
              {lrError.loginError_1 && <p id="l-error1" >To Date should not be less than From Date</p>}
              {lrError.loginError_2 && <p id="l-error2" >Please select From Date</p>}
              {lrError.loginError_2 && <p id="l-error3" >Please select a date on or before today.</p>}
            </div>
          </div>
          <div className="last-login" id="registerdate">
            <h6>REGISTERED DATE</h6>
            <div className="filterregdates input-group date">
              <span>From</span><span><input type="date" name="filterdate" max="9999-12-31" className="current-date" id="registerFromDate" data-date-format="DD/MMMM/YYYY" onClick={disableUsersTabFutureDates} onInput={checkUsersTabFutureDate} /></span>
              <span className="dateto">To</span><span><input type="date" name="filterdate" max="9999-12-31" className="current-date" id="registerToDate" data-date-format="DD/MMMM/YYYY" onClick={disableUsersTabFutureDates} onInput={checkUsersTabFutureDate} /></span>
            </div>
            <div className="dateserrormessages">
              {lrError.regError_1 && <p id="r-error1" >To Date should not be less than From Date</p>}
              {lrError.regError_2 && <p id="r-error2" >Please select From Date</p>}
              {lrError.regError_3 && <p id="r-error3" >Please select a date on or before today.</p>}

            </div>
          </div>
        </div>
        <input type="hidden" id="searchTextFilter" value="" />
        <div className="filter-popup-button-container">
          <button onClick={handleClose} className="filter-popup-button filter-popup-close">CLOSE</button>
          <button className="applyfilter" id="applyUserFilter" disabled={isDisabled()}>APPLY</button>
        </div>
      </div>
    </div>
  )
}
export default Filter_popup
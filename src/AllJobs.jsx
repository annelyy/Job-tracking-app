import './AllJobs.css'
import Button from './Button';
import { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';


function AllJobs() {
  const { isDarkTheme, jobs, deleteJob } = useAppContext();
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [selectedType, setSelectedType] = useState('0');
  const [searchWord, setSearchWord] = useState('');
  const [selectedSort, setSelectedSort] = useState('0');
  const [positions, setPositions] = useState([]);

  const jobsHtml = positions.map((item, idx) => (
    <li
      key={`card-${idx}`}
      className='card'>
      <div className='job-header'>
        <div className='main-icon'>{item.company.charAt(0)}</div>
        <div className='job-header-info'>
          <h3>{item.position}</h3>
          <p>{item.company}</p>
        </div>
      </div>

      <div className='job-info'>
        <div className='job-location'>
          <img className="job-icon"
            alt="location-icon"
            src={isDarkTheme ? 'location-dark.png' : 'location.png'}
          />
          <span> {item.location}</span>
        </div>

        <div className='job-date'>
          <img className="job-icon"
            alt='calendar-icon'
            src={isDarkTheme ? 'calendar-dark.png' : 'calendar.png'}
          />
          <span> {item.date}</span>
        </div>

        <div className='job-type'>
          <img className="job-icon"
            alt='portfolio-icon'
            src={isDarkTheme ? 'portfolio-dark.png' : 'portfolio.png'}
          />
          <span> {item.type}</span>
        </div>

        <div className='job-status'>
          <button className={item.status}>{item.status}</button>
        </div>

        <div className='action'>
          <Button
            className="form__submit-little"
            onClick={() => {
              deleteJob(item.position, item.company)
            }}
            type='button'>Delete</Button>
        </div>
      </div>
    </li>
  ))

  const filterPositions = (status, type, searchWord, sort) => {
    let filteredJobs = [];

    if (status === '0' && type === '0' && searchWord === '') {
      filteredJobs = jobs;
    } else {
      filteredJobs = jobs.filter(position => {
        const statusMatch = getStatusFilter(position, status);
        const typeMatch = getTypeFilter(position, type);
        const searchWordMatch = getSearchWordFilter(position, searchWord);
        return statusMatch && typeMatch && searchWordMatch;
      });
    }

    switch (sort) {
      case '1':
        filteredJobs.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case '2':
        filteredJobs.sort((a, b) => a.position.localeCompare(b.position));
        break;
      case '3':
        filteredJobs.sort((a, b) => b.position.localeCompare(a.position));
        break;
      default:
        filteredJobs.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }
    return filteredJobs;
  };


  const getStatusFilter = (position, status) => {
    switch (status) {
      case '1':
        return position.status.toLowerCase() === 'pending';
      case '2':
        return position.status.toLowerCase() === 'interview';
      case '3':
        return position.status.toLowerCase() === 'declined';
      default:
        return true;
    }
  };

  const getTypeFilter = (position, type) => {
    switch (type) {
      case '1':
        return position.type.toLowerCase() === 'full-time';
      case '2':
        return position.type.toLowerCase() === 'part-time';
      case '3':
        return position.type.toLowerCase() === 'internship';
      default:
        return true;
    }
  };

  const getSearchWordFilter = (position, searchWord) => {
    const propertiesToCheck = ['position', 'company', 'location', 'status', 'type'];

    for (const property of propertiesToCheck) {
      const propertyValue = position[property]?.toLowerCase(); // 使用可选链操作符确保属性存在
      if (propertyValue && propertyValue.includes(searchWord.toLowerCase())) {
        return true;
      }
    }

    return false;
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    const filteredPositions = filterPositions(status, selectedType, searchWord, selectedSort)
    setPositions(filteredPositions);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    const filteredPositions = filterPositions(selectedStatus, type, searchWord, selectedSort)
    setPositions(filteredPositions);
  };

  const handleSearchWordChange = (event) => {
    const newSearchWord = event.target.value;
    setSearchWord(newSearchWord);
    const filteredPositions = filterPositions(selectedStatus, selectedType, newSearchWord, selectedSort)
    setPositions(filteredPositions);
  };

  const handleSortChange = (event) => {
    const sort = event.target.value;
    setSelectedSort(sort);
    const filteredPositions = filterPositions(selectedStatus, selectedType, searchWord, sort)
    setPositions(filteredPositions);
  };

  const handleClearClick = (e) => {
    e.preventDefault();
    setSearchWord('');
    const filteredPositions = filterPositions(selectedStatus, selectedType, '', selectedSort)
    setPositions(filteredPositions);
  };

  const handleDefault = (e) => {
    e.preventDefault();
    setSelectedStatus('0');
    setSelectedType('0');
    setSearchWord('');
    setSelectedSort('0');
    const filteredPositions = filterPositions('0', '0', '', '0')
    setPositions(filteredPositions);

  }

  useEffect(() => {
    const filteredPositions = filterPositions(selectedStatus, selectedType, searchWord, selectedSort);

    setPositions(filteredPositions);
  }, [deleteJob]);

  return (
    <>
      <a className="skip-to-content-link" href="#main">Skip to content</a>
      <div className='allJobs-container'>
        <form action="/submit" className="form" method="post">
          <h2 className='form__header'>Search Form</h2>
          <div className='form__element'>
            <div className="form__block">
              <label htmlFor="search" className="form__label">Search</label>
              <div className="input-container">
                <input
                  name="search"
                  id="search"
                  className="form__input"
                  required
                  value={searchWord}
                  onChange={handleSearchWordChange}
                />
                {(searchWord !== '') && (
                  <button className="clear-button" onClick={handleClearClick}>✖️</button>
                )}
              </div>
            </div>

            <div className='form__block'>
              <label htmlFor="status" className="form__label">Job Status</label>
              <select name="status" id="status" className="form__input" required value={selectedStatus} onChange={handleStatusChange}>
                <option value="0">all</option>
                <option value="1">pending</option>
                <option value="2">interview</option>
                <option value="3">declined</option>
              </select>
            </div>

            <div className='form__block'>
              <label htmlFor="type" className="form__label">Job Type</label>
              <select name="type" id="type" className="form__input" required value={selectedType} onChange={handleTypeChange}>
                <option value="0">all</option>
                <option value="1">full-time</option>
                <option value="2">part-time</option>
                <option value="3">internship</option>
              </select>
            </div>

            <div className='form__block'>
              <label htmlFor="sort" className="form__label">Sort</label>
              <select name="sort" id="sort" className="form__input" required value={selectedSort} onChange={handleSortChange}>
                <option value="0">newest</option>
                <option value="1">oldest</option>
                <option value="2">a-z</option>
                <option value="3">z-a</option>
              </select>
            </div>

            <Button className="form__submit" type="submit" onClick={handleDefault}>Reset Search Values</Button>
          </div>
        </form>

        {positions.length > 0 ? (<p className='job-message'>{positions.length} Jobs Found</p>) : <p className='job-message'>No jobs to display...</p>}
        
        <ul className="cards">
          {jobsHtml}
        </ul>
      </div>
    </>
  );
}

export default AllJobs;
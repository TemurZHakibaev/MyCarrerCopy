import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login/Login';
import './Main.scss';
import { useEffect, useState } from 'react';
import {
  getData,
  postData,
  removeData,
  getSingleData,
  updateData,
} from '../../redux/education/extraReducer';

const Main = () => {
  const dispatch = useDispatch();
  const { data, loading, success, singleData } = useSelector(
    state => state.education,
  );

  const [postEducationData, setPostData] = useState({
    name: '',
    location: '',
    degree: 0,
    typeOfStudy: 0,
    dateFrom: '',
    dateTo: '',
  });

  const [updateEducationData, setUpdateEducationData] = useState();

  useEffect(() => {
    dispatch(getData());
  }, [success, singleData, updateEducationData]);

  useEffect(() => {
    if (singleData) {
      setUpdateEducationData({ ...singleData.data });
    }
  }, [singleData]);

  const token = localStorage.getItem('token');
  if (!token) {
    return <Login />;
  }
  const changeDegree = num => {
    if (num === 1) {
      return 'Дошкольный';
    } else if (num === 2) {
      return 'Средний';
    } else if (num === 3) {
      return 'Высший';
    }
  };

  const deleteEducation = id => {
    dispatch(removeData(id));
  };

  const addData = e => {
    e.preventDefault();
    const dateFrom = new Date(postEducationData.dateFrom).toISOString();
    const dateTo = new Date(postEducationData.dateTo).toISOString();
    const payload = {
      dateFrom,
      dateTo,
      name: postEducationData.name,
      location: postEducationData.location,
      degree: postEducationData.degree,
      typeOfStudy: postEducationData.typeOfStudy,
    };
    dispatch(postData(payload));
  };

  const updateSingleData = id => {
    const payload = { ...updateEducationData };
    dispatch(updateData({ data: payload, id }));
  };

  return (
    <div className='education'>
      <form className='education__add' onSubmit={addData}>
        <div className='education__add__top'>
          <input
            onChange={e =>
              setPostData(prev => ({ ...prev, name: e.target.value }))
            }
            placeholder='name'
            type='text'
          />
          <input
            onChange={e =>
              setPostData(prev => ({ ...prev, location: e.target.value }))
            }
            placeholder='location'
            type='text'
          />
        </div>
        <div className='education__add__bottom'>
          <select
            onChange={e =>
              setPostData(prev => ({ ...prev, degree: e.target.value }))
            }
            placeholder='degree'
            name=''
            id=''
          >
            <option value=''></option>
            <option value='0'>1</option>
            <option value='1'>2</option>
            <option value='2'>3</option>
          </select>
          <select
            onChange={e =>
              setPostData(prev => ({ ...prev, typeOfStudy: e.target.value }))
            }
            placeholder='degree'
            name=''
            id=''
          >
            <option disabled value=''></option>
            <option value='0'>online</option>
            <option value='1'>offline</option>
          </select>
          <input
            onChange={e =>
              setPostData(prev => ({ ...prev, dateFrom: e.target.value }))
            }
            placeholder='date from'
            type='date'
          />
          <input
            onChange={e =>
              setPostData(prev => ({ ...prev, dateTo: e.target.value }))
            }
            placeholder='date to'
            type='date'
          />
          <button>add education</button>
        </div>
      </form>
      <div className='education__cards'>
        {data.map(item => (
          <div key={item.id} className='education__cards__card'>
            <h3>{item.name}</h3>
            <div className='education__cards__card__top'>
              <p>Location{item.location}</p>
              <p>Degree {changeDegree(item.degree)}</p>
            </div>
            <div className='education__cards__card__middle'>
              <p>Date from {item.dateTo.slice(0, 10)}</p>
              <p>to {item.dateFrom.slice(0, 10)}</p>
            </div>
            <div className='education__cards__card__bottom'>
              <button
                onClick={() =>
                  dispatch(getSingleData(item.id)) && updateSingleData(item.id)
                }
              >
                update
              </button>
              <button onClick={() => deleteEducation(item.id)}>delete</button>
            </div>
            <div className='education__cards__card__update'>
              <form onSubmit={updateSingleData()}>
                <input
                  value={updateEducationData.name}
                  placeholder='name'
                  type='text'
                  onChange={e =>
                    setUpdateEducationData(prev => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <input
                  value={updateEducationData.location}
                  placeholder='location'
                  type='text'
                  onChange={e =>
                    setUpdateEducationData(prev => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
                <select
                  onChange={e =>
                    setUpdateEducationData(prev => ({
                      ...prev,
                      degree: e.target.value,
                    }))
                  }
                  value={updateEducationData.degree}
                >
                  <option disabled value='0'>
                    1
                  </option>
                  <option value='1'>2</option>
                  <option value='2'>3</option>
                </select>
                <select
                  onChange={e =>
                    setUpdateEducationData(prev => ({
                      ...prev,
                      typeOfStudy: e.target.value,
                    }))
                  }
                  value={updateEducationData.typeOfStudy}
                >
                  <option value='0'>online</option>
                  <option value='1'>offline</option>
                </select>
                <input
                  onChange={e =>
                    setUpdateEducationData(prev => ({
                      ...prev,
                      dateFrom: e.target.value,
                    }))
                  }
                  value={updateEducationData.dateFrom?.slice(0, 10)}
                  type='date'
                />
                <input
                  onChange={e =>
                    setUpdateEducationData(prev => ({
                      ...prev,
                      dateTo: e.target.value,
                    }))
                  }
                  value={updateEducationData.dateTo?.slice(0, 10)}
                  type='date'
                />
                <button>send update</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;

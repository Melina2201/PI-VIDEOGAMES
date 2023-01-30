import { getAllGenres, getAllPlatforms } from "../../actions";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import style from "./FormCreate.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platform: [],
    genre: [],
    image: "",
  });

  const gen = useSelector((state) => state.allMyGenres);

  const platf = useSelector((state) => state.platforms);

  function validate(form) {
    let error = {};

    if (!form.name) {
      error.name = "Name is required";
    } else if (form.name.length > 50) {
      error.name = "Name is too long";
    }

    if (!form.description) {
      error.description = "Description is required ";
    } else if (form.description.length > 1500) {
      error.description = "Description is too long. (Max = 1500 characters)";
    }

    if (!form.rating) {
      error.rating = "Rating is required";
    } else if (form.rating > 5 || form.rating < 0) {
      error.rating = "Rating must range between 0 to 5";
    }

    if (!form.released) {
      error.released = "Date of release is required";
    } else if (form.released.length < 10) {
      error.released = "Date of release is to long";
    }
    if (!form.image) {
      error.image = "Image URL is required";
    }

    if (!form.genre[0]) {
      error.genre = "Minimun one Genre is required ";
    }

    if (!form.platform[0]) {
      error.platform = "Minimun one Platform is required";
    }

    return error;
  }

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    setError(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    )
    console.log(form);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(error).length) {
      return;
    }
    axios.post("http://localhost:3002/videogames", form);
  };

  function handleSelectP(event) {
    if (
      event.target.value !== "platforms" &&
      !form.platform.includes(event.target.value)
    )
      setForm({
        ...form,
        platform: [...form.platform, event.target.value],
      });
      setError(
        validate({
          ...form,
          platform: [...form.platform, event.target.value],
        })
      );
  }

  function handleDeleteP(event) {
    setForm({
      ...form,
      platform: form.platform.filter(
        (element) => element !== event.target.value
      ),
    });
  }

  function handleSelectG(event) {
    if (
      event.target.value !== "genres" &&
      !form.genre.includes(event.target.value)
    )
      setForm({
        ...form,
        genre: [...form.genre, event.target.value],
      });
      setError(
        validate({
          ...form,
          genre: [...form.genre, event.target.value],
        })
      );
  }

  function handleDeleteG(event) {
    setForm({
      ...form,
      genres: form.genre.filter((element) => element !== event.target.value),
    });
  }

  return (
    <div className={style.containerPadre}>
    
    <div>
    <Link to="/videogames">
          <div><button className={style.buttonn}>BACK HOME</button></div>
          
        </Link>
        </div>

     <h1 className={style.title}>CREATE YOUR VIDEO GAME</h1>
     
        <div>
      <form onSubmit={submitHandler} className={style.form}>
       
        <div>  
          <input
            className={style.input}
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
            placeholder="Name"
          />
           {error.name && <span className={style.error}>{error.name}</span>}
        </div>

        <div>
          <input

            className={style.input}
            type="text"
            value={form.description}
            onChange={changeHandler}
            name="description"
            placeholder="Description"
          />
          {error.description && ( <span className={style.error}>{error.description}</span>)}
        </div>

        <select name="genres" onChange={handleSelectG} className={style.options}>
          <option value="genres" >
            Genres
          </option>
          {gen?.map((element, index) => (
            <option key={index}>{element}</option>
          ))}
          {error.genres && <span className={style.error}>{error.genres}</span>}
        </select>

        <div>
          {form.genre?.map((element, index) => (
            <span key={index}>
              {element}
              <button value={element} onClick={handleDeleteG}>
                X
              </button>
            </span>
          ))}
        </div>

        <div>
          <input
            className={style.input}
            type="date"
            value={form.released}
            onChange={changeHandler}
            name="released"
            placeholder="Released"
          />
          {error.released && <span className={style.error}>{error.released}</span>}
        </div>

        <div>
          <input
            className={style.input}
            type="number"
            value={form.rating}
            onChange={changeHandler}
            name="rating"
            placeholder="Rating"
          />
          {error.rating && <span className={style.error}>{error.rating}</span>}
        </div>

        <select name="platforms" onChange={handleSelectP} className={style.options}>
          <option value="platforms" >
            Platforms
          </option>
          {platf?.map((element, index) => (
            <option key={index}>{element}</option>
          ))}
        </select>
        {error.platforms && (<span className={style-error}>{error.platforms}</span>)}

        <div>
          {form.platform?.map((element, index) => (
            <span key={index}>
              {element}
              <button value={element} onClick={handleDeleteP}>
                X
              </button>
            </span>
          ))} 
           </div>
       

        <div>
          <input
            className={style.input}
            type="text"
            value={form.image}
            onChange={changeHandler}
            name="image"
            placeholder="Imagen"
          />
          {error.img && <span className={style.error}>{error.img}</span>}
        </div>

        <button className={style.buttonn} type="submit">SUBMIT</button>

      </form>

      </div> 

    </div>
  );
};

export default Form;

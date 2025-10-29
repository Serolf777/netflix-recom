import "../netflixRecom.scss";
import { useFormContext } from 'react-hook-form';

type NetflixShowProps = {
    genres: string[];
    onChangeHandler: () => void;
    register: () => void;
}

export const Dropdown = ({ genres, onChangeHandler } : NetflixShowProps) => {
    const { register } = useFormContext();

    return (
        <div className="dropdown-menu"> 
          <label>Select a genre: </label>
          <select id="genres" {...register("genres", { onChange: onChangeHandler })}>
            {genres.map((genre) => (
              <option key={genre} value={genre.toLowerCase()}>{genre}</option>
            ))}
          </select>
        </div>
    )
}
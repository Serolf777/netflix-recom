import "../styles/netflixRecom.scss";
import { useFormContext } from 'react-hook-form';
import { FC } from 'react';

export type NetflixShowProps = {
    genres: string[];
    onChangeHandler: () => void;
    register: () => void;
}

const Dropdown: FC<NetflixShowProps> = ({ genres, onChangeHandler }) => {
    const { register } = useFormContext();

    return (
        <div className="dropdown-menu"> 
          <label className="dropdown-label">Select a genre: </label>
          <select id="genres" {...register("genres", { onChange: onChangeHandler })}>
            {genres.map((genre) => (
              <option key={genre} value={genre.toLowerCase()}>{genre}</option>
            ))}
          </select>
        </div>
    )
}

export default Dropdown;
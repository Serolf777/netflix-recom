import "./shared.scss";
import { useFormContext } from 'react-hook-form';
import { FC } from 'react';

export type GenreDropdownProps = {
    genres: string[];
    onChangeHandler: () => void;
    register: () => void;
}

const GenreDropdown: FC<GenreDropdownProps> = ({ genres, onChangeHandler }) => {
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

export default GenreDropdown;
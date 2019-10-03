
import MovieModel from '../database/models/MovieModel';

class MovieRepository {
    get = async (id) => {
        const movie = await MovieModel.findByPk(id);
        return movie;
    }

    getAll = async (filter) => {
        const movies = await MovieModel.findAll(filter);
        return movies;
    }

    save = async (movie) => {
        const savedMovie = await MovieModel.create(movie);
        return savedMovie;
    }

    update = async (id, movie) => {
        await MovieModel.update(movie, { where: { id } });
        return this.get(id);
    }

    delete = async (id) => {
        const movie = await MovieModel.findByPk(id);
        if (!movie) return false;
        return movie.destroy({ force: true });
    }
}
export default MovieRepository;

import MovieRepository from '../../infra/repositories/MovieRepository';

class MovieService {
    constructor() {
        this.repository = new MovieRepository();
    }

    async get(id) {
        return this.repository.get(id);
    }

    async listAll(filter) {
        return this.repository.getAll(filter);
    }

    async save(movie) {
        return this.repository.save(movie);
    }

    async update(id, movie) {
        return this.repository.update(id, movie);
    }

    async delete(id) {
        return this.repository.delete(id);
    }
}

export default MovieService;

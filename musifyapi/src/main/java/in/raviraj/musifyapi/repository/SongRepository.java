package in.raviraj.musifyapi.repository;

import in.raviraj.musifyapi.document.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SongRepository extends MongoRepository<Song, String> {
}

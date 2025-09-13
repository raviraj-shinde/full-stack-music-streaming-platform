package in.raviraj.musifyapi.repository;

import in.raviraj.musifyapi.document.Album;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<Album, String> {
}

package in.raviraj.musifyapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.raviraj.musifyapi.document.Song;
import in.raviraj.musifyapi.dto.SongRequest;
import in.raviraj.musifyapi.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final Cloudinary cloudinary;

    public Song addSong(SongRequest request) throws IOException {
        try {

            Map<String, Object> imageUploadResult = cloudinary.uploader().upload(
                    request.getImageFile().getBytes(),
                    ObjectUtils.asMap("resource_type", "image")
            );

            Map<String, Object> audioUploadResult = cloudinary.uploader().upload(
                    request.getAudioFile().getBytes(),
                    ObjectUtils.asMap("resource_type", "video")
            );

            // Extract fields safely
            String audioUrl = (String) audioUploadResult.get("secure_url");
            String imageUrl = (String) imageUploadResult.get("secure_url");

            Number durationValue = (Number) audioUploadResult.get("duration");
            Double durationSeconds = durationValue != null ? durationValue.doubleValue() : 0.0;
            String duration = formatDuration(durationSeconds);

            Song newSong = Song.builder()
                    .name(request.getName())
                    .desc(request.getDesc())
                    .album(request.getAlbum())
                    .image(imageUrl)
                    .file(audioUrl)
                    .duration(duration)
                    .build();

            return songRepository.save(newSong);

        } catch (Exception e) {
            throw new RuntimeException("Error while uploading to Cloudinary:- " + e.getMessage());
        }
    }

    private String formatDuration(Double durationSeconds) {
        if (durationSeconds == null) return "0:00";
        int minutes = (int) (durationSeconds / 60);
        int seconds = (int) (durationSeconds % 60);
        return String.format("%d:%02d", minutes, seconds);
    }

}

package in.raviraj.musifyapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.raviraj.musifyapi.dto.SongRequest;
import in.raviraj.musifyapi.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/songs")
public class SongController {
    private final SongService songService;

    @PostMapping
    public ResponseEntity<?> addSong(@RequestPart String requestString, @RequestPart MultipartFile audioFile, @RequestPart MultipartFile imageFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            SongRequest songRequest = objectMapper.readValue(requestString, SongRequest.class);
            songRequest.setImageFile(imageFile);
            songRequest.setAudioFile(audioFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(songService.addSong(songRequest));

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

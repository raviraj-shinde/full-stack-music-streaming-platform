package in.raviraj.musifyapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.raviraj.musifyapi.dto.AlbumRequest;
import in.raviraj.musifyapi.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    @PostMapping
    public ResponseEntity<?> addAlbum(@RequestPart("request") String request,
                                      @RequestPart("file") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AlbumRequest albumRequest = objectMapper.readValue(request, AlbumRequest.class);
            albumRequest.setImageFile(file);
            return ResponseEntity.status(HttpStatus.CREATED).body(albumService.addAlbum(albumRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listAlbums(){
        try{
            return ResponseEntity.ok(albumService.getAllAlbums());
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
package in.raviraj.musifyapi.service;

import in.raviraj.musifyapi.document.User;
import in.raviraj.musifyapi.dto.RegisterRequest;
import in.raviraj.musifyapi.dto.UserResponse;
import in.raviraj.musifyapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse registerUser(RegisterRequest request){
        if (userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("User email already exists:- " + request.getEmail());
        }

        //create a new user
        User newUser = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.USER)
                .build();

        userRepository.save(newUser);

        return UserResponse.builder()
                .id(newUser.getId())
                .email(request.getEmail())
                .role(UserResponse.Role.USER)
                .build();
    }
}

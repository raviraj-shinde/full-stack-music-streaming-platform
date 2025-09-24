package in.raviraj.musifyapi.service;

import in.raviraj.musifyapi.document.User;
import in.raviraj.musifyapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found:- " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(existingUser.getEmail())
                .password(existingUser.getPassword())
                .authorities(getAuthorities(existingUser))
                .build();

    }

    private Collection<? extends GrantedAuthority> getAuthorities(User existingUser) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + existingUser.getRole().name()));
    }


}

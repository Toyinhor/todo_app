package backend.backend.Service;

import backend.backend.Entity.UserEntity;
import backend.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity usersEntity = userRepository.findFristByEmail(email);
        if (usersEntity == null  ) throw new UsernameNotFoundException("Không tìm thấy user");
        return org.springframework.security.core.userdetails.User.builder()
                .username(usersEntity.getEmail())
                .password(usersEntity.getPassword())
                .authorities("ROLE_")
                .build();
    }
}

package br.com.c3pgen.base.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PassGenerator {

	public static void main(String[] args) {

		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

		for (int i = 0; i < 10; i++) {
			System.out.println(bCryptPasswordEncoder.encode("GSH"));
		}
	}
}

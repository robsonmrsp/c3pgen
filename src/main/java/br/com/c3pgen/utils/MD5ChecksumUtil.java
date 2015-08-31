package br.com.c3pgen.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5ChecksumUtil {

	private static byte[] createChecksum(File filename) throws Exception {
		InputStream fis = new FileInputStream(filename);

		byte[] buffer = new byte[1024];
		MessageDigest complete = MessageDigest.getInstance("MD5");
		int numRead;

		do {
			numRead = fis.read(buffer);
			if (numRead > 0) {
				complete.update(buffer, 0, numRead);
			}
		} while (numRead != -1);

		fis.close();
		return complete.digest();
	}

	public static String getMD5Checksum(File filename) throws Exception {
		return getChecksunFromBytes(createChecksum(filename));
	}

	private static String getChecksunFromBytes(byte[] b) {
		String result = "";
		for (int i = 0; i < b.length; i++) {
			result += Integer.toString((b[i] & 0xff) + 0x100, 16).substring(1);
		}
		return result;
	}

	public static String getMD5Checksum(String text) throws Exception {
		return getChecksunFromBytes(text.getBytes());
	}

	private static String stringHexa(byte[] bytes) {
		StringBuilder s = new StringBuilder();
		for (int i = 0; i < bytes.length; i++) {
			int hight = ((bytes[i] >> 4) & 0xf) << 4;
			int low = bytes[i] & 0xf;
			if (hight == 0)
				s.append('0');
			s.append(Integer.toHexString(hight | low));
		}
		return s.toString();
	}

	public static String createMd5Hash(String text) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(text.getBytes());
			return stringHexa(md.digest());
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}
	public static void main(String[] args) {
		System.out.println(createMd5Hash("MD5ChecksumUtil.main()"));
		System.out.println(createMd5Hash("a"));     //0cc175b9c0f1b6a831c399e269772661
		System.out.println(createMd5Hash("b"));     //92eb5ffee6ae2fec3ad71c777531578f
		System.out.println(createMd5Hash("Robson"));//1f30ebcf6cc5b5417bd1c26a8023f7c0 
	}
}
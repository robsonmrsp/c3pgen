package br.com.c3pgen.rbac;

import org.junit.Assert;
import org.junit.Test;

public class RbacTest {

	@Test
	public void testMatch() {
		String identifier = "crud/enderecos/[0-9]{1,}";
		String url = "crud/enderecos/999";
		Assert.assertTrue(url.matches(identifier));
	}
}
